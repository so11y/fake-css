

export default (useRegister) => {
    const registerStyle = useRegister()

    registerStyle
        .register("mt", "margin-top")
        .register("mr", "margin-left")
        .register("mb", "margin-bottom")
        .register("ml", "margin-left")
        .register("pt", "padding-top")
        .register("pr", "padding-right")
        .register("pb", "padding-bottom")
        .register("pl", "padding-left")
        .register("w", "width")
        .register("h", "height")
        .register("flex", {
            key: "flex",
            parse(style) {
                return style.replaceAll("_", " ")
            },
        })
        .register("row", {
            genClass() {
                return '.row {display:flex;}'
            }
        })
        .register('column', {
            genClass() {
                return '.column {display:flex;flex-direction: column;}'
            }
        })
        .register('bg', {
            key: "background-color",
            unit: false,
            // parse(style){},//有就走自定義,沒有就走默認
            genStyle(key, value) {
                return { [key]: `${value}` }
            },
        })

}


