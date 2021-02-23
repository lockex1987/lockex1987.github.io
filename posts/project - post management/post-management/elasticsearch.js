import { Client } from '@elastic/elasticsearch';
import express from 'express';
import bodyParser from 'body-parser';


const client = new Client({
    node: 'http://localhost:9200'
});


/**
 * Tạo index.
 */
async function createIndex() {
    try {
        const { body } = await client.indices.create({
            index: 'post',
            body: {
                mappings: {
                    properties: {
                        date: {
                            type: 'date',
                            format: 'yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis'
                        },
                        modifiedTime: {
                            type: 'double'
                        },
                        category: {
                            type: 'keyword'
                        }
                    }
                }
            }
        });
        console.log('Create', body);
    } catch (ex) {
        // console.log(ex);
        console.log(ex.meta.body.error);
    }
}


/**
 * Xóa toàn bộ index.
 */
async function deleteIndex() {
    const { body } = await client.indices.delete({
        index: 'post'
    });
    console.log('Delete', body);
}


async function insertData() {
    const { body } = await client.index({
        index: 'gov',
        type: 'constituencies',
        id: '1',
        body: {
            ConstituencyName: 'Ipswich',
            ConstituencyID: 'E14000761',
            ConstituencyType: 'Borough',
            Electorate: 74499,
            ValidVotes: 48694
        }
    });
    console.log(body);
}

export const insertPost = async function (post) {
    try {
        await client.index({
            index: 'post',
            id: post.path,
            body: post
        });
    } catch (ex) {
        // console.log(ex);
        console.log(ex.meta.body.error);
    }
};


async function insertBulkData() {
    const myBody = [
        {
            index: {
                _index: 'gov',
                _type: 'constituencies',
                _id: '1'
            }
        },
        {
            ConstituencyName: 'Ipswich',
            ConstituencyID: 'E14000761',
            ConstituencyType: 'Borough'
        }
        // ...
    ];
    await client.bulk({
        // index: 'gov',
        // type: 'constituencies',
        body: myBody
    });
}


async function countData() {
    const { body } = await client.count({
        index: 'gov',
        type: 'constituencies'
    });
    // console.log(body);
    console.log('Count', body.count);
}


async function deleteData() {
    try {
        const { body } = await client.delete({
            index: 'gov',
            id: '1',
            type: 'constituencies'
        });
        console.log(body);
    } catch (ex) {
        console.log(ex);
    }
}


async function getAllDataToCheck() {
    const options = {
        index: 'post',
        body: {
            from: 0,
            size: 1000,
            query: {
                match_all: {}
            }
        },
        // Không hiển thị source, kết quả ngắn gọn
        _source: false
    };

    const { body } = await client.search(options);
    // console.log(body);
    console.log(body.hits.total);
    console.log(body.hits.hits);
}


/**
 * Tìm kiếm.
 * @param {String} queryText Xâu tìm kiếm
 * @param {Integer} from Chỉ số bản ghi bắt đầu
 * @param {Integer} size Số bản ghi
 */
async function runSearch(queryText, from, size) {
    try {
        let options;
        if (!queryText) {
            options = {
                index: 'post',
                body: {
                    from: from,
                    size: size,
                    query: {
                        match_all: {}
                    },
                    // Sắp xếp bài viết theo ngày xuất bản, đường dẫn
                    sort: [
                        {
                            date: 'desc'
                        },
                        {
                            // ID bản ghi chính là path
                            // Không sắp xếp được theo path vì path có kiểu dữ liệu là string, không được tối ưu cho sắp xếp
                            _id: { order: 'asc' }
                        }
                        /*,
                        'user',
                        {
                            age: 'asc'
                        },
                        '_score'
                        */
                    ]
                }
            };
        } else {
            options = {
                index: 'post',
                // type: 'constituencies',
                // fields: ['action', 'signature_count'],
                body: {
                    from: from,
                    size: size,
                    // _source: ['title', 'summary', 'publish_date']
                    query: {
                        // match: { ConstituencyName: 'Ipswich' }
                        // wildcard: { 'constituencyname': '???wich' }
                        // regexp: { 'constituencyname': '.+wich' }
                        // match: { content: queryText }
                        multi_match: {
                            query: queryText,
                            fields: ['title^3', 'path^3', 'description^2', 'content'],
                            // fields: ['title', 'path', 'description', 'content'],
                            // Search cả từ, các từ phải đứng cạnh nhau
                            type: 'phrase'
                        }
                    },
                    highlight: {
                        // pre_tags: ['<em>'],
                        // post_tags: ['</em>'],
                        fields: {
                            title: {},
                            path: {},
                            description: {},
                            content: {}
                        }
                    }
                }
            };
        }
        const { body } = await client.search(options);
        // console.log(body);
        // console.log(body.hits.total);
        console.log(body.hits.hits);
        const total = body.hits.total.value;
        let hits;
        if (!queryText) {
            hits = body.hits.hits.map(e => ({
                category: e._source.category,
                date: e._source.date,
                // id: e._id,
                path: e._source.path,
                title: e._source.title,
                description: e._source.description
            }));
        } else {
            hits = body.hits.hits.map(e => ({
                category: e._source.category,
                date: e._source.date,
                path: e.highlight.path?.[0] ?? e._source.path,
                title: e.highlight.title?.[0] ?? e._source.title,
                description: e.highlight.description?.[0] ?? e._source.description,
                content: e.highlight.content?.[0]
            }));
        }
        return {
            total,
            hits
        };
    } catch (ex) {
        // console.log(ex);
        console.log(ex.meta.body.error);

        return {
            total: 0,
            hits: []
        };
    }
}


function createApiServer() {
    const app = express();
    app.use(bodyParser.json());
    const port = process.env.PORT || 3001;

    // Enable CORS
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    app.get('/search', async (req, res) => {
        const queryText = req.query.queryText;
        const from = req.query.from;
        const size = req.query.size;
        const result = await runSearch(queryText, from, size);
        res.send(result);
    });

    app.listen(port, () => {
        console.log('Express server listening on port ' + port);
        // http://localhost:3001/search?queryText=&from=0&size=10
    });
}


/**
 * Đóng kết nối.
 */
export const closeConnection = function () {
    client.close();
};


async function init() {
    // createIndex();
    // deleteIndex();
    // insertData();
    // countData();
    // deleteData();
    // countData();

    // const result = await runSearch('', 0, 20);
    // console.log(result);

    // getAllDataToCheck();

    // createApiServer();

    // closeConnection();
}


// TODO:
// - Đồng bộ bài viết đã xóa
// - Search tiếng Việt
// - Tạo Laravel API
init();
