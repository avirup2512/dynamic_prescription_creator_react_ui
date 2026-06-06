const AppObject = {
    App:{
        headers:{
            templates:[
                {
                    id:"header_1",
                    name:"Header1",
                    headerRows:[
                        {
                            id:"header_rows_1",
                            name:"Header Rows 1",
                            headerSections:{
                                1:[{type:"inputtype_3"}],
                                2:[],
                                3:[{type:"inputtype_3"}]
                            }
                        },
                        {
                            id:"header_rows_2",
                            name:"Header Rows 2",
                            headerSections:{
                                1:[{type:"inputtype_1"},{type:"inputtype_1"},{type:"inputtype_1"},{type:"inputtype_1"}],
                                2:[],
                                3:[]
                            }
                        }
                    ]
                },
                {
                    id:"header_2",
                    name:"Header2",
                    headerRows:[
                        {
                            headerSections:{
                                1:[{type:"inputtype_3"}],
                                2:[],
                                3:[{type:"inputtype_3"}]
                            }
                        }
                    ]
                }
            ],
            savedData:[
                {
                    id:"saved_header_1",
                    templateId:"header_1",
                    name:'Saved Header data 1',
                    rowData:[
                        {
                            1:[{inputEntityId:"textbox_1", type:"inputtype_3"}],
                            2:[],
                            3:[{inputEntityId:"textbox_1", type:"inputtype_3"}]
                        },
                        {
                            1:[{type:"inputtype_1",inputEntityId:"input_1"},{type:"inputtype_1",inputEntityId:"input_1"},{type:"inputtype_1",inputEntityId:""},{type:"inputtype_1",inputEntityId:"input_2"}],
                            2:[],
                            3:[]
                        }
                    ]
                }
            ]
        },
        footer:{
            templates:[
                {
                    id:"footer_1",
                    name:"Footer1",
                    headerRows:[
                        {
                            footerSections:{
                                1:[{type:"inputtype_3"}],
                                2:[],
                                3:[{type:"inputtype_3"}]
                            }
                        },
                        {
                            footerSections:{
                                1:[{type:"inputtype_1"},{type:"inputtype_1"},{type:"inputtype_1"},{type:"inputtype_1"}],
                                2:[],
                                3:[]
                            }
                        }
                    ]
                },
                {
                    id:"footer_1",
                    name:"Footer2",
                    headerRows:[
                        {
                            footerSections:{
                                1:[{type:"inputtype_3"}],
                                2:[],
                                3:[{type:"inputtype_3"}]
                            }
                        }
                    ]
                }
            ],
            savedData:[
                {
                    id:"saved_footer_1",
                    templateId:"footer_1",
                    rowData:[
                        {
                            1:[{inputEntityId:"textbox_1", type:"inputtype_3"}],
                            2:[],
                            3:[{inputEntityId:"textbox_1", type:"inputtype_3"}]
                        },
                        {
                            1:[{type:"inputtype_1",inputEntityId:"input_1"},{type:"inputtype_1",inputEntityId:"input_1"},{type:"inputtype_1",inputEntityId:""},{type:"inputtype_1",inputEntityId:"input_2"}],
                            2:[],
                            3:[]
                        }
                    ]
                }
            ]
        },
        body:{
            templates:[
                {
                    id:"body_1",
                    name:"Early Morning",
                    sectionRows:[
                        {
                            bodySections:{
                                1:[{type:"inputtype_3"}],
                                2:[]
                            }
                        },
                        {
                            bodySections:{
                                1:[{type:"inputtype_1"}],
                                2:[]
                            }
                        }
                    ]
                },
                {
                    id:"body_2",
                    name:"Morning",
                    sectionRows:[
                        {
                            bodySections:{
                                1:[{type:"inputtype_3"}],
                                2:[]
                            }
                        }
                    ]
                }
            ],
            savedData:[
                {
                    id:"saved_body_1",
                    templateId:"body_1",
                    rowData:[
                        {
                            1:[{inputEntityId:"textbox_1", type:"inputtype_3"}],
                        },
                        {
                            1:[{type:"inputtype_1",inputEntityId:"input_1"},{type:"inputtype_1",inputEntityId:"input_1"},{type:"inputtype_1",inputEntityId:""},{type:"inputtype_1",inputEntityId:"input_2"}],
                            2:[]
                        }
                    ]
                }
            ]
        },
        full_prescription_template:{
            templates:[
                {
                    header:"header_1",
                    body:"body_1",
                    footer:"footer_1"
                }
            ],
            savedData:[
                {
                    headerId:"saved_header_1",
                    bodyId:"saved_body_1",
                    footerId:"saved_footer_1"
                }
            ]
        },
        inputType:[
            {id:"inputtype_1",name:"input"},
            {id:"inputtype_2",name:"dropdown"},
            {id:"inputtype_3",name:"textbox"}
        ],
        inputEntity:{
            input: [
                { id: "input_1", name: 'Address', value: '54,sukantasarani' },
                { id: "input_2", name: 'Phone number', value: '7044709863' },
            ],
            dropdown: [
                {
                    id: "dropdown_1",
                    name: 'Seeds',
                    values: ['Pumpkin seeds', 'Chia seeds', 'sunflower seeds', 'Jeera and Methi'],
                },
                { id: "dropdown_2", name: 'Misc', values: ['Jeera and Methi', 'Curd'] },
            ],
            textbox: [
                {
                    id: "textbox_1",
                    name: 'Address',
                    value: '54,sukantasarani, postoffice:itelgachha, kolkata:700079',
                },
            ]
        }
    }   
}
export default AppObject;