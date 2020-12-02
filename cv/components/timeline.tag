<timeline>
    <div class="timeline position-relative my-5 out-of-box-xl">
        <div class="timeline-container is-hidden">
            <div class="content">
                <div class="text-orange font-size-1.5">09/2005 - 07/2009</div>
                <img src="images/company/coltech.png"/>
                <p>Học khoa Công nghệ thông tin, đại học Công nghệ.</p>

                <p>Tốt nghiệp loại Giỏi.<p>
          </div>
        </div>

        <div class="timeline-container is-hidden">
            <div class="content">
                <div class="text-orange font-size-1.5">08/2009 - 03/2016</div>
                <img src="images/company/viettel.svg" />
                <p>Làm việc ở trung tâm phần mềm Viettel.</p>

                <ul class="pl-3">
                    <li>
                        <span lang="en">KM: Knowledge Management.</span>
                        <span lang="vi">KM: Hệ thống quản lý tri thức</span>
                    </li>
                    <li>
                        <span lang="en">KPI (Key Performance Indicator): read and report KPI of servers</span>
                        <span lang="vi">KPI: Hệ thống quản lý KPI</span>
                    </li>
                    <li>
                        <span lang="en">QLOTO: car management; you can view current position or track route of a car on Google Map.</span>
                        <span lang="vi">QLOTO: Hệ thống quản lý ô tô (có theo dõi vị trí và lộ trình xe trên Google Map)</span>
                    </li>
                    <li>
                        <span lang="en">QLSX: Production Management.</span>
                        <span lang="vi">QLSX: Hệ thống quản lý sản xuất</span>
                    </li>
                    <li>
                        <span lang="en">TDKT: Import from and export to Excel file the reward information of employees.</span>
                        <span lang="vi">TĐKT: Thi đua khen thưởng</span>
                    </li>
                    <li>
                        <span lang="en">Dataroom: manage files of a user by user folders.</span>
                        <span lang="vi">Dataroom: Hệ thống quản lý file</span>
                    </li>
                    <li>
                        <span lang="en">Email: send propaganda email to all employees of Viettel Group.</span>
                        <span lang="vi">Email: Gửi mail truyền thông</span>
                    </li>
                    <li>
                        <span lang="en">VHR: Viettel Human Resource.</span>
                        <span lang="vi">VHR: Quản lý nhân sự</span>
                    </li>
                    <li>
                        <span lang="en">VPS: Viettel Privilege System.</span>
                        <span lang="vi">VPS: Hệ thống phân quyền tập trung</span>
                    </li>
                    <li>
                        <span lang="en">VPM: Viettel Payroll Management.</span>
                        <span lang="vi">VPM: Quản trị tiền lương</span>
                    </li>
                </ul>
            </div>
        </div>

        <div class="timeline-container is-hidden">
            <div class="content">
                <div class="text-orange font-size-1.5">06/2015 - 07/2016</div>
                <img src="images/company/imip.png" />
                <!-- 12/05/2016 - 29/07/2016 -->
                <p>Làm việc ở công ty IMIP.</p>

                <ul class="pl-3">
                    <li>
                        <span lang="en">iMIP: operates with multi-function printer.</span>
                        <span lang="vi">Làm một số chức năng tương tác với máy in đa chức năng</span>
                    </li>
                </ul>
            </div>
        </div>

        <div class="timeline-container is-hidden">
            <div class="content">
                <div class="text-orange font-size-1.5">08/2016 - 03/2017</div>
                <img src="images/company/ifi solution.png" />
                <p>Chuyển sang công ty IFI Solutions.</p>

                <ul class="pl-3">
                    <li>
                        <span lang="en">M2M: manages energy data of a French customer.</span>
                        <span lang="vi">M2M: Quản lý năng lượng (khách hàng Pháp)</span>
                    </li>
                </ul>
            </div>
        </div>

        <div class="timeline-container is-hidden">
            <div class="content">
                <div class="text-orange font-size-1.5">Từ 04/2017</div>
                <img src="images/company/vtcc.png" />
                <p>Làm việc cho trung tâm Không gian mạng Viettel.</p>

                <ul class="pl-3">
                    <li>
                        <a href="https://safenet.vn/" target="_blank">safenet.vn</a>: 
                        <span lang="en">Internet filter</span>
                        <span lang="vi">Dịch vụ giám sát Internet của con cái</span>
                    </li>
                    <li>
                        <a href="https://itrithuc.vn/" target="_blank">itrithuc.vn</a>:
                        <span lang="en">Vietnamese Knowledge System Digitalization</span>
                        <span lang="vi">Hệ tri thức Việt số hóa</span>
                    </li>
                    <li>
                        <a href="https://vtcc.ai/" target="_blank">vtcc.ai</a>:
                        <span lang="en">Voice Platform</span>
                        <span lang="vi">Dịch vụ TTS và ASR (Voice)</span>
                    </li>
                    <li>
                        <a href="http://reputa.vn/" target="_blank">reputa.vn</a>:
                        <span lang="en">Reputa</span>
                        <span lang="vi">Quản lý danh tiếng</span>
                    </li>
                    <li>
                        <a href="https://ttcd.vn/" target="_blank">ttcd.vn</a>:
                        <span lang="en">TTCD</span>
                        <span lang="vi">Truyền thông chủ động</span>
                    </li>
                </ul>
          </div>
        </div>
    </div>


    <script>
        this.on('mount', () => {
            // Danh sách các blog
            let timelineBlocks = document.querySelectorAll('.timeline-container');
            console.log(timelineBlocks.length);

            function isBelow(el) {
                let top = el.getBoundingClientRect().top + window.pageYOffset - document.documentElement.clientTop;
                let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
                let height = window.innerHeight;
                return top > scrollTop + height * 0.75;
            }

            function isHidden(el) {
                return el.classList.contains('is-hidden');
            }

            function hideBlock(el) {
                el.classList.add('is-hidden');
            }

            function showBlock(el) {
                el.classList.remove('is-hidden');
                el.classList.add('bounce-in');
            }

            // Hide timeline blocks which are outside the viewport
            timelineBlocks.forEach((el) => {
                if (isBelow(el)) {
                    hideBlock(el);
                } else {
                    showBlock(el);
                }
            });

            // On scolling, show/animate timeline blocks when enter the viewport
            window.addEventListener('scroll', () => {
                timelineBlocks.forEach((el) => {
                    if ( !isBelow(el) && isHidden(el) ) {
                        showBlock(el);
                    }
                });
            });
        });
    </script>
</timeline>
