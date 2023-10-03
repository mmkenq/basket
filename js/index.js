const template = new Template;
const figure = new Figure;
window.onload = () => {
	let app = new AppComponent({
        id:'app',
        template: template.appTemplate,
        render: true
    });

    // console.log(app);
};
