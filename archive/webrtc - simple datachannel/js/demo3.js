new Vue({
    el: '#app',

    data() {
        return {
            // Trạng thái đang kết nối hay không
            isConnected: false,

            // Chỉ có một Connection
            connection: null,
            // Channel cho gửi dữ liệu
            sendChannel: null,
            // Channel cho nhận dữ liệu
            receiveChannel: null,

            // Các thông tin khi trao đổi giữa hai máy
            myIceCandidate: '',
            yourIceCandidate: '',
            myDescription: '',
            yourDescription: '',

            // Nội dung tin nhắn
            message: '',

            // Vai trò ('sender' hoặc 'receiver')
            role: 'sender'
        };
    },

    mounted() {
        this.setupConnections();
    },

    methods: {
        setupConnections() {
            // Tạo kết nối local và lắng nghe các sự kiện
            this.connection = new RTCPeerConnection();

            // Tạo data channel ở local và lắng nghe các sự kiện
            this.sendChannel = this.connection.createDataChannel('sendChannel');
            this.setupSendChannel();

            // Tạo kết nối remote và lắng nghe các sự kiện
            this.connection.ondatachannel = this.receiveChannelCallback;

            // Lắng nghe khi sinh xong ICE candidate ở local
            this.connection.onicecandidate = (evt) => {
                // console.log('Local ICE candidate', evt.candidate);
                if (evt.candidate) {
                    this.myIceCandidate = JSON.stringify(evt.candidate);

                    // TODO: Gửi candiate cho remote
                }
            };
        },

        addIceCandiate() {
            this.handleIceCandidate(this.connection, this.yourIceCandidate);
        },

        /**
         * Kết nối các peer.
         * Bình thường, chúng ta sẽ tìm và kết nối đến một máy remote.
         * Tuy nhiên, ở demo này, chúng ta chỉ kết nối hai đối tượng local.
         */
        async connectPeers() {
            // Local tạo offer 
            const offer = await this.connection.createOffer();
            // console.log('Offer', offer);
            await this.connection.setLocalDescription(offer);

            
            this.myDescription = JSON.stringify(offer);

            // TODO: Gửi offer cho remote
        },

        processAnswerOrOffer() {
            if (this.role == 'sender') {
                this.processAnswer();
            } else {
                this.processOffer();
            }
        },

        async processOffer() {
            await this.connection.setRemoteDescription(new RTCSessionDescription(JSON.parse(this.yourDescription)));

            // Remote tạo answer
            const answer = await this.connection.createAnswer();
            // console.log('Answer', answer);
            await this.connection.setLocalDescription(answer);

            this.myDescription = JSON.stringify(answer);

            // TODO: Remote gửi answer lại cho local
        },

        async processAnswer() {
            await this.connection.setRemoteDescription(new RTCSessionDescription(JSON.parse(this.yourDescription)));
        },

        async handleIceCandidate(connection, iceCandidate) {
            await connection.addIceCandidate(new RTCIceCandidate(JSON.parse(iceCandidate)));
        },

        /**
         * Click nút đóng kết nối.
         */
        disconnectPeers() {
            // Đóng các data channel và các kết nối
            this.sendChannel.close();
            this.receiveChannel.close();
            this.connection.close();

            this.sendChannel = null;
            this.receiveChannel = null;
            this.connection = null;

            // Cập nhật giao diện
            this.isConnected = false;

            this.message = '';
        },

        /**
         * Gửi tin nhắn.
         */
        sendMessage() {
            this.insertMessage('Tôi', this.message);

            this.sendChannel.send(this.message);

            // Sẵn sàng gửi tiếp
            this.message = '';
            this.$refs.messageInputBox.focus();
        },

        /**
         * Hàm này được gọi khi mà các kết nối được mở, sẵn sàng.
         * Lắng nghe các sự kiện ở channel nhận.
         * @param {Event} evt 
         */
        receiveChannelCallback(evt) {
            this.receiveChannel = evt.channel;

            this.setupReceiveChannel();
        },

        setupReceiveChannel() {
            this.receiveChannel.onmessage = (evt) => {
                const msg = evt.data;
                this.insertMessage('Bạn', msg);
            };

            this.receiveChannel.onopen = this.handleReceiveChannelStatusChange;
            this.receiveChannel.onclose = this.handleReceiveChannelStatusChange;
        },

        setupSendChannel() {
            this.sendChannel.onopen = this.handleSendChannelStatusChange;
            this.sendChannel.onclose = this.handleSendChannelStatusChange;
        },

        /**
         * Khi có tin nhắn mới thì hiển thị thêm.
         */
        insertMessage(user, msg) {
            const div = document.createElement('div');
            div.className = 'py-1';
            div.textContent = user + ': ' + msg;
            this.$refs.receiveBox.appendChild(div);
        },

        /**
         * Lắng nghe sự kiện thay đổi trạng thái của sendChannel.
         * @param {Event} evt 
         */
        handleSendChannelStatusChange(evt) {
            console.log('sendChannel', this.sendChannel);
            console.log('Compare', this.sendChannel === this.receiveChannel);
            if (this.sendChannel && this.sendChannel.readyState === 'open') {
                this.isConnected = true;    
                this.$refs.messageInputBox.focus();
            } else {
                this.isConnected = false;
            }
        },

        /**
         * Lắng nghe sự kiện đóng mở channel nhận.
         * @param {Event}} evt 
         */
        handleReceiveChannelStatusChange(evt) {
            console.log('receiveChannel', this.receiveChannel);
            console.log('Compare', this.sendChannel === this.receiveChannel);
        }
    }
});
