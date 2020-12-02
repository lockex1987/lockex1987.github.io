/**
 * Component để thể hiện từng thư viện.
 */
const OptionItem = {
    template: `
            <div class="mt-4">
                <div>
                    <span class="text-success">&bull;</span>

                    <span>{{e.name}}</span>

                    <span class="ml-2"
                            v-if="e.link">
                        <a :href="e.link"
                                target="_blank"        
                                class="text-decoration-none">
                            <img src="/images/icon/link.svg" class="icon"/>
                        </a>
                    </span>

                    <span class="badge badge-info ml-2"
                            v-if="e.version">
                        {{e.version}}
                    </span>

                    <label class="custom-control custom-checkbox d-inline-block ml-2"
                            v-if="e.cssPath">
                        <input type="checkbox"
                                class="custom-control-input"
                                v-model="e.cssChosen">
                        <span class="custom-control-label">
                            <a :href="e.cssPath"
                                    target="_blank"
                                    class="text-decoration-none">
                                CSS
                            </a>
                        </span>
                    </label>

                    <label class="custom-control custom-checkbox d-inline-block ml-2"
                            v-if="e.jsPath">
                        <input type="checkbox"
                                class="custom-control-input"
                                v-model="e.jsChosen">
                        <span class="custom-control-label">
                            <a :href="e.jsPath"
                                    target="_blank"
                                    class="text-decoration-none">
                                JS
                            </a>
                        </span>
                    </label>
                </div>

                <div class="text-muted pl-3 font-size-0.875"
                        v-if="e.note">
                    {{e.note}}
                </div>
            </div>`,

    props: [
        'e'
    ]
};
