import InputEntityTypeArray from './inputEntityType'

const RouteArray:any = [
    {
        label:"Prescriptions",
        url:"prescription",
        show:true
    },
    {
        label:"Templates",
        url:"template",
        show:true
    },
    // {
    //     label:"Headers",
    //     url:"header",
    //     show:true,
    //     children:[
    //         {
    //             label:"Header Template",
    //             type:"header_template",
    //             url: `header/header_template`,
    //             show: true,
    //         },
    //         {
    //             label:"Saved Header",
    //             type:"saved_header",
    //             url: `header/saved_header`,
    //             show: true,
    //         },
    //     ]
    // },
    // {
    //     label:"Footers",
    //     url:"footer",
    //     show:true,
    //     children:[
    //         {
    //             label:"Footer Template",
    //             type:"footer_template",
    //             url: `footer/footer_template`,
    //             show: true,
    //         },
    //         {
    //             label:"Saved Footer",
    //             type:"saved_footer",
    //             url: `footer/saved_footer`,
    //             show: true,
    //         },
    //     ]
    // },
    // {
    //     label:"Bodies",
    //     url:"body",
    //     show:true,
    //     children:[
    //         {
    //             label:"Body Template",
    //             type:"body_template",
    //             url: `body/body_template`,
    //             show: true,
    //         },
    //         {
    //             label:"Saved Body",
    //             type:"saved_body",
    //             url: `body/saved_body`,
    //             show: true,
    //         },
    //     ]
    // },
    {
        label:"Sections",
        url:"section",
        show:true,
    },
    {
        label:"Patient",
        url:"patient",
        show:true
    },
     {
        label:"Input Entity",
        url:"inputEntity",
        show:true,
        children: InputEntityTypeArray.map((entityType:any) => ({
            label: entityType.label,
            url: `inputEntity/${entityType.type}`,
            show: true,
        }))
    },
]
export default RouteArray;
