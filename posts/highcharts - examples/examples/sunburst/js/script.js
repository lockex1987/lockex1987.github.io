import rawData from '../data/data.js';


// Lấy bản ghi gốc (Thế giới)
const rootRecord = rawData.find(e => !e.parent);

// Danh sách để vẽ trên biểu đồ
const filteredData = [];

// Bản ghi gốc ở biểu đồ
let currentRoot;


/**
 * Duyệt các bản ghi để tính giá trị cho các bản ghi không phải lá.
 * @param {Object} node Bản ghi đang xét hiện tại
 */
function traverseCalculatePopulation(node) {
    let population = 0;
    let hasChild = false;
    rawData.forEach(e => {
        if (e.parent == node.id) {
            // console.log(e);
            population += traverseCalculatePopulation(e);
            hasChild = true;
        }
    });
    if (hasChild) {
        node.value = population;
    }
    // Có một số bản ghi không có số liệu (Melanesia, Papua New Guinea,...)
    if (node.value == undefined) {
        node.value = 0;
    }
    return node.value;
}


/**
 * Ẩn các bản ghi từ level 2 trở lên mà có giá trị bé.
 * @param {Array} resultArr Mảng kết quả
 * @param {Object} node Bản ghi đang xét
 * @param {Integer} level Cấp độ
 * @param {Float} threshold Giá trị nhỏ nhất
 */
function hideSmallRecord(resultArr, node, level, threshold) {
    rawData.filter(e => e.parent == node.id && (level < 2 || e.value >= threshold))
        .forEach(e => {
            resultArr.push(e);
            hideSmallRecord(resultArr, e, level + 1, threshold);
        });
}


/**
 * Lấy ra danh sách các bản ghi để hiển thị trên biểu đồ.
 * @param {Object} node Bản ghi gốc
 */
function processFilterData(node) {
    currentRoot = node;

    filteredData.length = 0;
    filteredData.push(node);
    const ratio = 0.012;
    hideSmallRecord(filteredData, node, 1, node.value * ratio);
}


/**
 * Vẽ biểu đồ.
 */
function drawChart() {
    Highcharts.chart('container', {
        chart: {
            height: '100%'
        },
        title: {
            text: 'World population 2017'
        },
        subtitle: {
            text: 'Source <href="https://en.wikipedia.org/wiki/List_of_countries_by_population_(United_Nations)">Wikipedia</a>'
        },
        series: [
            {
                type: 'sunburst',
                // data: rawData,
                data: filteredData,
                // Click vào tâm thì hiển thị cấp trên
                allowDrillToNode: true,
                // allowDrillToNode: false,
                cursor: 'pointer',
                // Hiển thị label
                dataLabels: {
                    format: '{point.name}',
                    filter: {
                        property: 'innerArcLength',
                        operator: '>',
                        value: 16
                    }
                },
                // Các cấp độ
                levels: [
                    {
                        level: 1,
                        levelIsConstant: false,
                        dataLabels: {
                            filter: {
                                property: 'outerArcLength',
                                operator: '>',
                                value: 64
                            }
                        }
                    },
                    {
                        level: 2,
                        colorByPoint: true
                    },
                    {
                        level: 3,
                        colorVariation: {
                            key: 'brightness',
                            to: -0.5
                        }
                    },
                    {
                        level: 4,
                        colorVariation: {
                            key: 'brightness',
                            to: 0.5
                        }
                    }
                ]
            }
        ],

        tooltip: {
            headerFormat: '',
            pointFormat: 'The population of <b>{point.name}</b> is <b>{point.value}</b>'
        },

        plotOptions: {
            series: {
                events: {
                    click(evt) {
                        const pointObj = evt.point;
                        // pointObj.category
                        // console.log(pointObj);
                        // console.log(pointObj.options);
                        const node = pointObj.options;
                        let newRoot;
                        if (node.id == currentRoot.id) {
                            // Click vào giữa thì chuyển lên cấp trên
                            newRoot = rawData.find(e => e.id == node.parent);
                        } else {
                            newRoot = node;
                        }
                        // Animation đang không đẹp bằng allowDrillToNode
                        if (newRoot) {
                            // processFilterData(newRoot);
                            // drawChart();
                        }
                    }
                }
            }
        }
    });
}


function init() {
    // Duyệt và cập nhật dân số
    traverseCalculatePopulation(rootRecord);
    // console.log(rawData);
    processFilterData(rootRecord);
    // Thêm màu transparent vào đầu cấu hình màu global
    // Vòng tròn trung tâm sẽ có màu transparent này
    Highcharts.getOptions().colors.splice(0, 0, 'transparent');
    drawChart();
}


init();
