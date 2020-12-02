new Vue({
    el: '#app',

    data() {
        return {
            // Trạng thái đang kết nối hay không
            isConnected: false,

            // Connection cho kết nối "local"
            localConnection: null,
            // Connection cho kết nối "remote"
            remoteConnection: null,
            // Channel cho "local" (sender)
            sendChannel: null,
            // Channel cho "remote" (receiver),
            receiveChannel: '',

            // Các thông tin khi trao đổi giữa hai máy
            localIceCandidate: '',
            remoteIceCandidate: '',
            localDecription: '',
            remoteDescription: '',

            // Nội dung tin nhắn
            message: ''
        };
    },

    mounted() {
        this.setupConnections();
    },

    methods: {
        setupConnections() {
            // Tạo kết nối local và lắng nghe các sự kiện
            this.localConnection = new RTCPeerConnection();

            // Tạo data channel ở local và lắng nghe các sự kiện
            this.sendChannel = this.localConnection.createDataChannel('sendChannel');
            this.setupSendChannel();

            // Tạo kết nối remote và lắng nghe các sự kiện
            this.remoteConnection = new RTCPeerConnection();
            this.remoteConnection.ondatachannel = this.receiveChannelCallback;

            // Lắng nghe khi sinh xong ICE candidate ở local
            this.localConnection.onicecandidate = (evt) => {
                // console.log('Local ICE candidate', evt.candidate);
                if (evt.candidate) {
                    this.localIceCandidate = JSON.stringify(evt.candidate);

                    // TODO: Gửi candiate cho remote
                }
            };

            // Lắng nghe khi sinh xong ICE candidate ở remote
            this.remoteConnection.onicecandidate = (evt) => {
                // console.log('Remote ICE candidate', evt.candidate);
                if (evt.candidate) {
                    this.remoteIceCandidate = JSON.stringify(evt.candidate);

                    // TODO: Gửi candiate cho local
                }
            };
        },

        remoteAddLocalIceCandiate() {
            // Remote thêm ICE candidate
            this.handleIceCandidate(this.remoteConnection, this.localIceCandidate);
        },

        /**
         * Kết nối các peer.
         * Bình thường, chúng ta sẽ tìm và kết nối đến một máy remote.
         * Tuy nhiên, ở demo này, chúng ta chỉ kết nối hai đối tượng local.
         */
        async connectPeers() {
            // Local tạo offer 
            const offer = await this.localConnection.createOffer();
            console.log('Offer', offer);
            await this.localConnection.setLocalDescription(offer);

            
            this.localDecription = JSON.stringify(offer);

            // TODO: Gửi offer cho remote
        },

        async processOffer() {
            // Remote nhận offer
            await this.handleOffer(this.remoteConnection, this.localDecription);

            // Remote tạo answer
            const answer = await this.remoteConnection.createAnswer();
            console.log('Answer', answer);
            await this.remoteConnection.setLocalDescription(answer);

            this.remoteDescription = JSON.stringify(answer);

            // TODO: Remote gửi answer lại cho local
        },

        async handleIceCandidate(connection, iceCandidate) {
            await connection.addIceCandidate(new RTCIceCandidate(JSON.parse(iceCandidate)));
        },

        async handleOffer(connection, offer) {
            await connection.setRemoteDescription(new RTCSessionDescription(JSON.parse(offer)));
        },

        /**
         * Click nút đóng kết nối.
         */
        disconnectPeers() {
            // Đóng các data channel và các kết nối
            this.sendChannel.close();
            this.receiveChannel.close();
            this.localConnection.close();
            this.remoteConnection.close();

            this.sendChannel = null;
            this.receiveChannel = null;
            this.localConnection = null;
            this.remoteConnection = null;

            // Cập nhật giao diện
            this.isConnected = false;

            this.message = '';
        },

        /**
         * Gửi tin nhắn.
         */
        sendMessage() {
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
                this.insertMessage('Sender', msg);

                // Các channel là hai chiều, vừa có thể nhận, vừa có thể gửi
                // Test bằng cách gửi lại xâu đảo ngược
                const reversedMessage = msg.split('').reverse().join('');
                this.receiveChannel.send(reversedMessage);
            };
            this.receiveChannel.onopen = this.handleReceiveChannelStatusChange;
            this.receiveChannel.onclose = this.handleReceiveChannelStatusChange;
        },

        setupSendChannel() {
            this.sendChannel.onmessage = (evt) => {
                const msg = evt.data;
                this.insertMessage('Receiver', msg);
            };

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
        }
    }
});
