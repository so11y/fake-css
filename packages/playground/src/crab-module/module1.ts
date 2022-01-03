import { defineModule } from "../../../fake-css/src/fakeCss"

export default defineModule("user", {
    setup(v) {
        v.register("user_layout", {
            chunk(ref) {
                return [
                    ref.pl_20,
                    ref.pr_30,
                    ref.mt_15,
                    ref.mb_15,
                    ref.row,
                    ref.bg_red,
                    ref.fontSize_50
                ]
            }
        })
    }
})