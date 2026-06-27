// ---------- Data ----------

import { Activity, ClipboardCheck, Columns2, FlaskConical, MessageSquare, Phone, Pill, User, Users } from "lucide-react";
import AddSectionButton from "./AddSectionButton";
import FolderSection from "./FolderSection";
import Footer from "./Footer";
import MetadataFooter from "./MetadataFooter";
import PanelHeader from "./PanelHeader";
import type { FolderGroup } from "../../type/TemplateStructure";
import { useEffect } from "react";
const f = {
    "id": "404d4235-32d2-4860-b152-159a0ca6afb3",
    "name": "Prescription Template",
    "created_by": "a72c50af-d949-4bdb-8d05-911dfd85ffe4",
    "is_deleted": 0,
    "created_at": "2026-06-20T05:27:32.224Z",
    "updated_at": "2026-06-20T06:13:59.118Z",
    "quantity_id": null,
    "header": [
        {
            "name": "Prescription_Test_Header_01",
            "sectionOrder": 1,
            "template_section_id": "73e7899b-8772-40d1-834f-091ec6c31abd",
            "section_id": "2f65cb49-e12c-4c3d-89cd-c00e332dbdd9",
            "template_id": "404d4235-32d2-4860-b152-159a0ca6afb3",
            "is_header": 1,
            "is_body": 0,
            "is_footer": 0,
            "rows": [
                {

                    "template_row_id": "31d43807-159a-492e-8c23-a5aa88ad53a9",
                    "row_name": "",
                    "row_order": 1,
                    "is_header": 1,
                    "is_body": 0,
                    "is_footer": 0,
                    "columns": [
                        {
                            "column_id": "36133902-055c-4716-be35-a95efd1ac4ed",
                            "column_name": "",
                            "width": 50,
                            "column_order": 0,
                            "inputGroup": [
                                {
                                    "template_input_group_id": "a755db4d-e023-4958-9825-04db505c6342",
                                    "input_group_order": 1,
                                    "inputs": [
                                        {
                                            "input_id": "05799b71-a9d3-4706-bb78-d960a8fbe0b8",
                                            "input_name": "",
                                            "input_type_id": "b2bf08f7-dbea-4dd5-ad96-59de10ffbc56",
                                            "show_label": 0,
                                            "show_quantity": 0,
                                            "quantity_id": null,
                                            "input_entity_id": "07af9cd7-3ae3-4af7-ad6b-bce510c8d8cf",
                                            "input_entity_name": "Name",
                                            "input_entity_value": "Avirup Chakraborty",
                                            "input_type_name": "INPUT_TYPE_1",
                                            "template_input_value": "",
                                            "template_quantity_value": "",
                                            "quantity_name": null,
                                            "dropdown_option_value": null,
                                            "dropdown_option_id": null,
                                            "dropdown_option_values": [],
                                            "quantity_option_values": [],
                                            "template_input_extranotes": null,
                                            "input_order": 1,
                                            "is_bold": 1,
                                            "font_size": 18,
                                            "extra_note": 0,
                                            "template_input_quantity_option_id": null,
                                            "quantity_option_value": null,
                                            "isVisible": 0,
                                            "or_input_id": null
                                        }
                                    ],
                                    "or_input_group_id": null
                                },
                                {
                                    "template_input_group_id": "945c6196-50a5-41a4-81a6-e08608769a7a",
                                    "input_group_order": 2,
                                    "inputs": [
                                        {
                                            "input_id": "a8151cc4-d990-4197-a649-280b4f8e7fd8",
                                            "input_name": "",
                                            "input_type_id": "b2bf08f7-dbea-4dd5-ad96-59de10ffbc56",
                                            "show_label": 0,
                                            "show_quantity": 0,
                                            "quantity_id": null,
                                            "input_entity_id": "705d9a95-ca6a-4ed1-b135-544c1e34fba1",
                                            "input_entity_name": "Designation",
                                            "input_entity_value": "Software Developer",
                                            "input_type_name": "INPUT_TYPE_1",
                                            "template_input_value": "",
                                            "template_quantity_value": "",
                                            "quantity_name": null,
                                            "dropdown_option_value": null,
                                            "dropdown_option_id": null,
                                            "dropdown_option_values": [],
                                            "quantity_option_values": [],
                                            "template_input_extranotes": null,
                                            "input_order": 1,
                                            "is_bold": 0,
                                            "font_size": 16,
                                            "extra_note": 0,
                                            "template_input_quantity_option_id": null,
                                            "quantity_option_value": null,
                                            "isVisible": 0,
                                            "or_input_id": null
                                        }
                                    ],
                                    "or_input_group_id": null
                                },
                                {
                                    "template_input_group_id": "21caab3a-236e-4840-a02e-74a25c0f3749",
                                    "input_group_order": 3,
                                    "inputs": [
                                        {
                                            "input_id": "2a46a7eb-739c-4050-b3e5-f1d4cde2f964",
                                            "input_name": "",
                                            "input_type_id": "b2bf08f7-dbea-4dd5-ad96-59de10ffbc56",
                                            "show_label": 0,
                                            "show_quantity": 0,
                                            "quantity_id": null,
                                            "input_entity_id": "c1e6eb89-e00c-4c07-b963-fd8e02e5b0e9",
                                            "input_entity_name": "Education",
                                            "input_entity_value": "Bachelor in Software development",
                                            "input_type_name": "INPUT_TYPE_1",
                                            "template_input_value": "",
                                            "template_quantity_value": "",
                                            "quantity_name": null,
                                            "dropdown_option_value": null,
                                            "dropdown_option_id": null,
                                            "dropdown_option_values": [],
                                            "quantity_option_values": [],
                                            "template_input_extranotes": null,
                                            "input_order": 1,
                                            "is_bold": 0,
                                            "font_size": 16,
                                            "extra_note": 0,
                                            "template_input_quantity_option_id": null,
                                            "quantity_option_value": null,
                                            "isVisible": 0,
                                            "or_input_id": null
                                        }
                                    ],
                                    "or_input_group_id": null
                                },
                                {
                                    "template_input_group_id": "5cc93cdd-edfd-496d-845c-13f5a5b9a607",
                                    "input_group_order": 4,
                                    "inputs": [
                                        {
                                            "input_id": "cbe136e8-40fe-4f01-975d-cde5a1837932",
                                            "input_name": "",
                                            "input_type_id": "b2bf08f7-dbea-4dd5-ad96-59de10ffbc56",
                                            "show_label": 1,
                                            "show_quantity": 0,
                                            "quantity_id": null,
                                            "input_entity_id": "e3693774-e7e1-4117-acbc-e38c40df91ce",
                                            "input_entity_name": "Phone",
                                            "input_entity_value": "25126631",
                                            "input_type_name": "INPUT_TYPE_1",
                                            "template_input_value": "",
                                            "template_quantity_value": "",
                                            "quantity_name": null,
                                            "dropdown_option_value": null,
                                            "dropdown_option_id": null,
                                            "dropdown_option_values": [],
                                            "quantity_option_values": [],
                                            "template_input_extranotes": null,
                                            "input_order": 1,
                                            "is_bold": 1,
                                            "font_size": 16,
                                            "extra_note": 0,
                                            "template_input_quantity_option_id": null,
                                            "quantity_option_value": null,
                                            "isVisible": 0,
                                            "or_input_id": null
                                        }
                                    ],
                                    "or_input_group_id": null
                                }
                            ]
                        },
                        {
                            "column_id": "8518596e-5795-4d9a-984f-2aedeb7b31fe",
                            "column_name": "",
                            "width": 50,
                            "column_order": 2,
                            "inputGroup": [
                                {
                                    "template_input_group_id": "75409d6f-2d3f-48e4-8880-f98158087f60",
                                    "input_group_order": 1,
                                    "inputs": [
                                        {
                                            "input_id": "0963c930-430b-4aa5-9d8a-14ee62029816",
                                            "input_name": "",
                                            "input_type_id": "b2bf08f7-dbea-4dd5-ad96-59de10ffbc56",
                                            "show_label": 0,
                                            "show_quantity": 0,
                                            "quantity_id": null,
                                            "input_entity_id": "984dfe76-0c1e-4bc8-8c22-906143c87b63",
                                            "input_entity_name": "Attach to",
                                            "input_entity_value": "Attach To",
                                            "input_type_name": "INPUT_TYPE_1",
                                            "template_input_value": "",
                                            "template_quantity_value": "",
                                            "quantity_name": null,
                                            "dropdown_option_value": null,
                                            "dropdown_option_id": null,
                                            "dropdown_option_values": [],
                                            "quantity_option_values": [],
                                            "template_input_extranotes": null,
                                            "input_order": 1,
                                            "is_bold": 1,
                                            "font_size": 16,
                                            "extra_note": 0,
                                            "template_input_quantity_option_id": null,
                                            "quantity_option_value": null,
                                            "isVisible": 0,
                                            "or_input_id": null
                                        },
                                        {
                                            "input_id": "f7d276eb-1b33-43f0-901a-1037fb793257",
                                            "input_name": "",
                                            "input_type_id": "b2bf08f7-dbea-4dd5-ad96-59de10ffbc56",
                                            "show_label": 0,
                                            "show_quantity": 0,
                                            "quantity_id": null,
                                            "input_entity_id": "579fbc32-2c3b-4800-8e41-affc8c04dee8",
                                            "input_entity_name": "My Address",
                                            "input_entity_value": "54,sukanta sarani, Post office:Italgachha, Kolkata:700079",
                                            "input_type_name": "INPUT_TYPE_1",
                                            "template_input_value": "",
                                            "template_quantity_value": "",
                                            "quantity_name": null,
                                            "dropdown_option_value": null,
                                            "dropdown_option_id": null,
                                            "dropdown_option_values": [],
                                            "quantity_option_values": [],
                                            "template_input_extranotes": null,
                                            "input_order": 2,
                                            "is_bold": 0,
                                            "font_size": 16,
                                            "extra_note": 0,
                                            "template_input_quantity_option_id": null,
                                            "quantity_option_value": null,
                                            "isVisible": 0,
                                            "or_input_id": null
                                        }
                                    ],
                                    "or_input_group_id": null
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "name": "Paitent Information After Grouping",
            "sectionOrder": 2,
            "template_section_id": "75b7b85f-775a-4ed9-8a2d-c812d2965317",
            "section_id": "4f6cc174-0048-4e64-9b70-3c8a302edb7b",
            "template_id": "404d4235-32d2-4860-b152-159a0ca6afb3",
            "is_header": 1,
            "is_body": 0,
            "is_footer": 0,
            "rows": [
                {
                    "template_row_id": "86ab4196-a468-40cc-b73b-a8930cb122b2",
                    "row_name": "",
                    "row_order": 1,
                    "is_header": 1,
                    "is_body": 0,
                    "is_footer": 0,
                    "columns": [
                        {
                            "column_id": "8e5e73e7-5fc0-4d55-97be-b1dcfb25297b",
                            "column_name": "",
                            "width": 50,
                            "column_order": 0,
                            "inputGroup": [
                                {
                                    "template_input_group_id": "39fbd50e-cb05-40eb-bafe-108a7a6ff0d6",
                                    "input_group_order": 1,
                                    "inputs": [
                                        {
                                            "input_id": "6c354a54-e29a-4cf2-95b9-81c10df9ba27",
                                            "input_name": "",
                                            "input_type_id": "b2bf08f7-dbea-4dd5-ad96-59de10ffbc56",
                                            "show_label": 1,
                                            "show_quantity": 0,
                                            "quantity_id": null,
                                            "input_entity_id": "91e75075-be9b-48b5-99ed-b5c00d6ad3fa",
                                            "input_entity_name": "Paitent Name",
                                            "input_entity_value": "name",
                                            "input_type_name": "INPUT_TYPE_1",
                                            "template_input_value": "Ms Sita Naskar",
                                            "template_quantity_value": "",
                                            "quantity_name": null,
                                            "dropdown_option_value": null,
                                            "dropdown_option_id": null,
                                            "dropdown_option_values": [],
                                            "quantity_option_values": [],
                                            "template_input_extranotes": null,
                                            "input_order": 1,
                                            "is_bold": 0,
                                            "font_size": 16,
                                            "extra_note": 0,
                                            "template_input_quantity_option_id": null,
                                            "quantity_option_value": null,
                                            "isVisible": 0,
                                            "or_input_id": null
                                        },
                                        {
                                            "input_id": "ff5fd617-0381-4fad-92af-db08328b3557",
                                            "input_name": "",
                                            "input_type_id": "b2bf08f7-dbea-4dd5-ad96-59de10ffbc56",
                                            "show_label": 1,
                                            "show_quantity": 0,
                                            "quantity_id": null,
                                            "input_entity_id": "78b8aa45-3396-4235-8703-ecfa29be5831",
                                            "input_entity_name": "Height",
                                            "input_entity_value": "3",
                                            "input_type_name": "INPUT_TYPE_1",
                                            "template_input_value": "3 feet",
                                            "template_quantity_value": "",
                                            "quantity_name": null,
                                            "dropdown_option_value": null,
                                            "dropdown_option_id": null,
                                            "dropdown_option_values": [],
                                            "quantity_option_values": [],
                                            "template_input_extranotes": null,
                                            "input_order": 2,
                                            "is_bold": 0,
                                            "font_size": 16,
                                            "extra_note": 0,
                                            "template_input_quantity_option_id": null,
                                            "quantity_option_value": null,
                                            "isVisible": 0,
                                            "or_input_id": null
                                        },
                                        {
                                            "input_id": "588340cf-47b6-49a5-9dcf-56c6795890ff",
                                            "input_name": "",
                                            "input_type_id": "b2bf08f7-dbea-4dd5-ad96-59de10ffbc56",
                                            "show_label": 1,
                                            "show_quantity": 0,
                                            "quantity_id": null,
                                            "input_entity_id": "4b06445c-b0c5-4dd4-b9ec-20cac16e1e18",
                                            "input_entity_name": "Weight",
                                            "input_entity_value": "2",
                                            "input_type_name": "INPUT_TYPE_1",
                                            "template_input_value": "200 kg",
                                            "template_quantity_value": "",
                                            "quantity_name": null,
                                            "dropdown_option_value": null,
                                            "dropdown_option_id": null,
                                            "dropdown_option_values": [],
                                            "quantity_option_values": [],
                                            "template_input_extranotes": null,
                                            "input_order": 3,
                                            "is_bold": 0,
                                            "font_size": 16,
                                            "extra_note": 0,
                                            "template_input_quantity_option_id": null,
                                            "quantity_option_value": null,
                                            "isVisible": 0,
                                            "or_input_id": null
                                        }
                                    ],
                                    "or_input_group_id": null
                                }
                            ]
                        },
                        {
                            "column_id": "453f95a6-de67-4cf1-a9ba-5b889c66df0d",
                            "column_name": "",
                            "width": 50,
                            "column_order": 2,
                            "inputGroup": [
                                {
                                    "template_input_group_id": "95b5125e-5490-4c08-b36b-5d8dbeed21c0",
                                    "input_group_order": 1,
                                    "inputs": [
                                        {
                                            "input_id": "8a5fabd5-d5d8-4bcd-ba15-f6654003ab14",
                                            "input_name": "",
                                            "input_type_id": "b2bf08f7-dbea-4dd5-ad96-59de10ffbc56",
                                            "show_label": 1,
                                            "show_quantity": 0,
                                            "quantity_id": null,
                                            "input_entity_id": "ca7386dd-6434-417c-9241-4824b4f095e5",
                                            "input_entity_name": "Age",
                                            "input_entity_value": "2",
                                            "input_type_name": "INPUT_TYPE_1",
                                            "template_input_value": "98 Years",
                                            "template_quantity_value": "",
                                            "quantity_name": null,
                                            "dropdown_option_value": null,
                                            "dropdown_option_id": null,
                                            "dropdown_option_values": [],
                                            "quantity_option_values": [],
                                            "template_input_extranotes": null,
                                            "input_order": 1,
                                            "is_bold": 0,
                                            "font_size": 16,
                                            "extra_note": 0,
                                            "template_input_quantity_option_id": null,
                                            "quantity_option_value": null,
                                            "isVisible": 0,
                                            "or_input_id": null
                                        },
                                        {
                                            "input_id": "7cae4d16-012f-49b2-bae2-dd0efc29bbaa",
                                            "input_name": "",
                                            "input_type_id": "b2bf08f7-dbea-4dd5-ad96-59de10ffbc56",
                                            "show_label": 1,
                                            "show_quantity": 0,
                                            "quantity_id": null,
                                            "input_entity_id": "5312233c-059e-4784-afb8-c31a1028f8ba",
                                            "input_entity_name": "BMI",
                                            "input_entity_value": "\"\"",
                                            "input_type_name": "INPUT_TYPE_1",
                                            "template_input_value": "34",
                                            "template_quantity_value": "",
                                            "quantity_name": null,
                                            "dropdown_option_value": null,
                                            "dropdown_option_id": null,
                                            "dropdown_option_values": [],
                                            "quantity_option_values": [],
                                            "template_input_extranotes": null,
                                            "input_order": 2,
                                            "is_bold": 0,
                                            "font_size": 16,
                                            "extra_note": 0,
                                            "template_input_quantity_option_id": null,
                                            "quantity_option_value": null,
                                            "isVisible": 0,
                                            "or_input_id": null
                                        }
                                    ],
                                    "or_input_group_id": null
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "name": "KCal Section",
            "sectionOrder": 3,
            "template_section_id": "5040d30c-d061-4c56-9190-1eda677daa6f",
            "section_id": "3c42979e-fec9-47a2-98d9-b7f4241c74e1",
            "template_id": "404d4235-32d2-4860-b152-159a0ca6afb3",
            "is_header": 1,
            "is_body": 0,
            "is_footer": 0,
            "rows": [
                {
                    "template_row_id": "f8c441a2-bd4e-4f5d-856e-da101825ea6b",
                    "row_name": "",
                    "row_order": 1,
                    "is_header": 1,
                    "is_body": 0,
                    "is_footer": 0,
                    "columns": [
                        {
                            "column_id": "02412dac-1719-48ee-ba14-86f2b6bf82fa",
                            "column_name": "",
                            "width": 100,
                            "column_order": 0,
                            "inputGroup": [
                                {
                                    "template_input_group_id": "34a61b48-eaa1-4ec1-9337-a57baaebeb04",
                                    "input_group_order": 1,
                                    "inputs": [
                                        {
                                            "input_id": "e242b518-1d5c-4c22-a9e8-44ebb5b15c10",
                                            "input_name": "",
                                            "input_type_id": "b2bf08f7-dbea-4dd5-ad96-59de10ffbc56",
                                            "show_label": 0,
                                            "show_quantity": 0,
                                            "quantity_id": null,
                                            "input_entity_id": "575cf628-4481-4f1e-a0c8-bfa351a6d786",
                                            "input_entity_name": "KCal Selection",
                                            "input_entity_value": null,
                                            "input_type_name": "INPUT_TYPE_2",
                                            "template_input_value": "",
                                            "template_quantity_value": "",
                                            "quantity_name": null,
                                            "dropdown_option_value": "1400 Kcal Regular weight reduction diet chart",
                                            "dropdown_option_id": "961b5e87-2fff-469a-b23b-3e3edeef9ef6",
                                            "dropdown_option_values": [
                                                {
                                                    "value": "1400 Kcal Regular weight reduction diet chart",
                                                    "id": "961b5e87-2fff-469a-b23b-3e3edeef9ef6"
                                                }
                                            ],
                                            "quantity_option_values": [],
                                            "template_input_extranotes": null,
                                            "input_order": 1,
                                            "is_bold": 1,
                                            "font_size": 18,
                                            "extra_note": 0,
                                            "template_input_quantity_option_id": null,
                                            "quantity_option_value": null,
                                            "isVisible": 0,
                                            "or_input_id": null
                                        }
                                    ],
                                    "or_input_group_id": null
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "name": "Meal_Section",
            "sectionOrder": 4,
            "template_section_id": "52a97855-8744-4b83-8256-4b1b8e99517a",
            "section_id": "436853f5-a47c-4580-b772-de18e67a6938",
            "template_id": "404d4235-32d2-4860-b152-159a0ca6afb3",
            "is_header": 1,
            "is_body": 0,
            "is_footer": 0,
            "rows": [
                {
                    "template_row_id": "d4d747a0-724c-4555-bd5b-ec98d6d6eab2",
                    "row_name": "",
                    "row_order": 1,
                    "is_header": 1,
                    "is_body": 0,
                    "is_footer": 0,
                    "columns": [
                        {
                            "column_id": "fc07be72-c60f-41ca-8b2c-fcfeba4caf53",
                            "column_name": "",
                            "width": 50,
                            "column_order": 0,
                            "inputGroup": [
                                {
                                    "template_input_group_id": "2dd44263-f3bb-4814-a830-90836c74f218",
                                    "input_group_order": 1,
                                    "inputs": [
                                        {
                                            "input_id": "57123b05-f6a1-4683-9336-017232c547a3",
                                            "input_name": "",
                                            "input_type_id": "b2bf08f7-dbea-4dd5-ad96-59de10ffbc56",
                                            "show_label": 0,
                                            "show_quantity": 0,
                                            "quantity_id": null,
                                            "input_entity_id": "525ac7e1-a129-4f82-b3c4-86b1bf24d789",
                                            "input_entity_name": "Time of Day",
                                            "input_entity_value": null,
                                            "input_type_name": "INPUT_TYPE_2",
                                            "template_input_value": "",
                                            "template_quantity_value": "",
                                            "quantity_name": null,
                                            "dropdown_option_value": "Early Morning",
                                            "dropdown_option_id": "906894a2-4f56-4ab7-84bf-090960271d9f",
                                            "dropdown_option_values": [
                                                {
                                                    "value": "Early Morning",
                                                    "id": "906894a2-4f56-4ab7-84bf-090960271d9f"
                                                }
                                            ],
                                            "quantity_option_values": [],
                                            "template_input_extranotes": null,
                                            "input_order": 1,
                                            "is_bold": 0,
                                            "font_size": 16,
                                            "extra_note": 0,
                                            "template_input_quantity_option_id": null,
                                            "quantity_option_value": null,
                                            "isVisible": 0,
                                            "or_input_id": null
                                        }
                                    ],
                                    "or_input_group_id": null
                                }
                            ]
                        },
                        {
                            "column_id": "e4b66c89-6853-48e3-9aba-f6b98b5fe714",
                            "column_name": "",
                            "width": 50,
                            "column_order": 2,
                            "inputGroup": [
                                {
                                    "template_input_group_id": "b7241b39-e6b2-4065-9781-975d54f366dd",
                                    "input_group_order": 1,
                                    "inputs": [
                                        {
                                            "input_id": "fa439704-eb92-4184-aa32-dace531ab5a2",
                                            "input_name": "",
                                            "input_type_id": "b2bf08f7-dbea-4dd5-ad96-59de10ffbc56",
                                            "show_label": 0,
                                            "show_quantity": 1,
                                            "quantity_id": "9e31f904-eb66-465c-b426-151bab600833",
                                            "input_entity_id": "98d58028-fb98-4166-ab17-fc7ec4f47977",
                                            "input_entity_name": "Beverages",
                                            "input_entity_value": null,
                                            "input_type_name": "INPUT_TYPE_2",
                                            "template_input_value": "",
                                            "template_quantity_value": "10",
                                            "quantity_name": "Misc Quantity",
                                            "dropdown_option_value": "Jeera Water",
                                            "dropdown_option_id": "1b63db83-3647-4f6c-9095-cf87888e8016",
                                            "dropdown_option_values": [
                                                {
                                                    "value": "Jeera Water",
                                                    "id": "1b63db83-3647-4f6c-9095-cf87888e8016"
                                                }
                                            ],
                                            "quantity_option_values": [
                                                {
                                                    "value": "plate",
                                                    "id": "632356cb-9932-4ecf-bdbd-4c75df9ef51d"
                                                },
                                                {
                                                    "value": "Pieces",
                                                    "id": "fa641ff1-8fcb-46f0-a40f-b7ffde812370"
                                                },
                                                {
                                                    "value": "Akash Ganga",
                                                    "id": "2aa33530-ba12-429b-8c2b-892cf3887b4b"
                                                },
                                                {
                                                    "value": "ml",
                                                    "id": "2cef256a-310e-455c-a17e-f10507aceff4"
                                                },
                                                {
                                                    "value": "gm (Raw Weight)",
                                                    "id": "b7bf84d0-22c9-4ac5-8156-52c53a41c761"
                                                },
                                                {
                                                    "value": "gm",
                                                    "id": "47eb01a2-6f45-4ce1-8214-ff2e3ea3b62a"
                                                },
                                                {
                                                    "value": "Table spoon",
                                                    "id": "de09fe3f-64fc-43fd-8589-8fc99a0b14c3"
                                                }
                                            ],
                                            "template_input_extranotes": "Soaked in 100ml water overnight",
                                            "input_order": 1,
                                            "is_bold": 0,
                                            "font_size": 16,
                                            "extra_note": 1,
                                            "template_input_quantity_option_id": "47eb01a2-6f45-4ce1-8214-ff2e3ea3b62a",
                                            "quantity_option_value": "",
                                            "isVisible": 0,
                                            "or_input_id": null
                                        }
                                    ],
                                    "or_input_group_id": null
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "name": "Meal_Section",
            "sectionOrder": 5,
            "template_section_id": "670b153c-a3c9-45d4-bbe5-a7cbcb63f452",
            "section_id": "436853f5-a47c-4580-b772-de18e67a6938",
            "template_id": "404d4235-32d2-4860-b152-159a0ca6afb3",
            "is_header": 1,
            "is_body": 0,
            "is_footer": 0,
            "rows": [
                {
                    "template_row_id": "dac15531-9451-48f4-92e3-596e6a7f2eff",
                    "row_name": "",
                    "row_order": 1,
                    "is_header": 1,
                    "is_body": 0,
                    "is_footer": 0,
                    "columns": [
                        {
                            "column_id": "82e68a99-7b9e-46ed-8e46-dba6cfaab0f6",
                            "column_name": "",
                            "width": 50,
                            "column_order": 0,
                            "inputGroup": [
                                {
                                    "template_input_group_id": "797fe248-f21a-429e-b3a6-ff102c9b4996",
                                    "input_group_order": 1,
                                    "inputs": [
                                        {
                                            "input_id": "57d3f5d1-a322-4e06-b560-9221622ea4a0",
                                            "input_name": "",
                                            "input_type_id": "b2bf08f7-dbea-4dd5-ad96-59de10ffbc56",
                                            "show_label": 0,
                                            "show_quantity": 0,
                                            "quantity_id": null,
                                            "input_entity_id": "525ac7e1-a129-4f82-b3c4-86b1bf24d789",
                                            "input_entity_name": "Time of Day",
                                            "input_entity_value": null,
                                            "input_type_name": "INPUT_TYPE_2",
                                            "template_input_value": "",
                                            "template_quantity_value": "",
                                            "quantity_name": null,
                                            "dropdown_option_value": "Morning",
                                            "dropdown_option_id": "7fda526e-ebc3-4a63-bbfb-da337ea1daac",
                                            "dropdown_option_values": [
                                                {
                                                    "value": "Morning",
                                                    "id": "7fda526e-ebc3-4a63-bbfb-da337ea1daac"
                                                }
                                            ],
                                            "quantity_option_values": [],
                                            "template_input_extranotes": null,
                                            "input_order": 1,
                                            "is_bold": 0,
                                            "font_size": 16,
                                            "extra_note": 0,
                                            "template_input_quantity_option_id": null,
                                            "quantity_option_value": null,
                                            "isVisible": 0,
                                            "or_input_id": null
                                        }
                                    ],
                                    "or_input_group_id": null
                                }
                            ]
                        },
                        {
                            "column_id": "0983e70c-b66f-4a11-a185-899867ce7c0f",
                            "column_name": "",
                            "width": 50,
                            "column_order": 2,
                            "inputGroup": [
                                {
                                    "template_input_group_id": "9078a707-0310-40a5-9a42-cb1856fc89a5",
                                    "input_group_order": 1,
                                    "inputs": [
                                        {
                                            "input_id": "63a52cbc-798a-43ad-a6d7-e8be7787f8bc",
                                            "input_name": "",
                                            "input_type_id": "b2bf08f7-dbea-4dd5-ad96-59de10ffbc56",
                                            "show_label": 0,
                                            "show_quantity": 1,
                                            "quantity_id": "9e31f904-eb66-465c-b426-151bab600833",
                                            "input_entity_id": "f21c34fa-d091-4cb1-ac7b-4ca59bb67f2b",
                                            "input_entity_name": "Healthy Snacks",
                                            "input_entity_value": null,
                                            "input_type_name": "INPUT_TYPE_2",
                                            "template_input_value": "",
                                            "template_quantity_value": "200",
                                            "quantity_name": "Misc Quantity",
                                            "dropdown_option_value": "Sprouted",
                                            "dropdown_option_id": "28e1ca37-c60d-4a69-aac4-698d74d7d135",
                                            "dropdown_option_values": [
                                                {
                                                    "value": "Sprouted",
                                                    "id": "28e1ca37-c60d-4a69-aac4-698d74d7d135"
                                                }
                                            ],
                                            "quantity_option_values": [
                                                {
                                                    "value": "Akash Ganga",
                                                    "id": "2aa33530-ba12-429b-8c2b-892cf3887b4b"
                                                },
                                                {
                                                    "value": "Pieces",
                                                    "id": "fa641ff1-8fcb-46f0-a40f-b7ffde812370"
                                                },
                                                {
                                                    "value": "plate",
                                                    "id": "632356cb-9932-4ecf-bdbd-4c75df9ef51d"
                                                },
                                                {
                                                    "value": "ml",
                                                    "id": "2cef256a-310e-455c-a17e-f10507aceff4"
                                                },
                                                {
                                                    "value": "gm (Raw Weight)",
                                                    "id": "b7bf84d0-22c9-4ac5-8156-52c53a41c761"
                                                },
                                                {
                                                    "value": "gm",
                                                    "id": "47eb01a2-6f45-4ce1-8214-ff2e3ea3b62a"
                                                },
                                                {
                                                    "value": "Table spoon",
                                                    "id": "de09fe3f-64fc-43fd-8589-8fc99a0b14c3"
                                                }
                                            ],
                                            "template_input_extranotes": null,
                                            "input_order": 1,
                                            "is_bold": 0,
                                            "font_size": 16,
                                            "extra_note": 0,
                                            "template_input_quantity_option_id": null,
                                            "quantity_option_value": "",
                                            "isVisible": 0,
                                            "or_input_id": null
                                        }
                                    ],
                                    "or_input_group_id": null
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    "body": [],
    "footer": [],
    "sections": []
}
const headerFolder: FolderGroup = {
    kind: "folder",
    id: "header",
    label: "Header",
    count: 2,
    children: [
        { kind: "simpleField", id: "clinic-logo", label: "Clinic Logo" },
        { kind: "simpleField", id: "physician-info", label: "Physician Info" },
    ],
};

const bodyFolder: FolderGroup = {
    kind: "folder",
    id: "body",
    label: "Body",
    count: 6,
    children: [
        {
            kind: "section",
            id: "patient-info",
            label: "Patient Information",
            icon: User,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-600",
            fieldsCount: 6,
            status: "blue",
            selected: true,
            children: [
                {
                    kind: "row",
                    id: "row-1",
                    label: "Row 1",
                    columns: [
                        {
                            kind: "column",
                            id: "col-1",
                            label: "Column 1",
                            icon: Columns2,
                            groupLabel: "Demographics",
                            groupIcon: Users,
                            fields: ["Name", "DOB", "Sex"],
                        },
                        {
                            kind: "column",
                            id: "col-2",
                            label: "Column 2",
                            icon: Columns2,
                            groupLabel: "Contact",
                            groupIcon: Phone,
                            fields: ["Phone", "Email"],
                        },
                    ],
                },
            ],
        },
        {
            kind: "section",
            id: "vital-signs",
            label: "Vital Signs",
            icon: Activity,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-600",
            fieldsCount: 4,
            status: "green",
        },
        {
            kind: "section",
            id: "chief-complaint",
            label: "Chief Complaint",
            icon: MessageSquare,
            iconBg: "bg-purple-50",
            iconColor: "text-purple-500",
            fieldsCount: 2,
            status: "green",
        },
        {
            kind: "section",
            id: "diagnosis",
            label: "Diagnosis (ICD-10)",
            icon: ClipboardCheck,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-500",
            fieldsCount: 2,
            status: "green",
        },
        {
            kind: "section",
            id: "medications",
            label: "Medications",
            icon: Pill,
            iconBg: "bg-amber-50",
            iconColor: "text-amber-500",
            fieldsCount: 6,
            status: "amber",
        },
        {
            kind: "section",
            id: "lab-orders",
            label: "Lab Orders",
            icon: FlaskConical,
            iconBg: "bg-teal-50",
            iconColor: "text-teal-500",
            fieldsCount: 4,
            status: "green",
        },
    ],
};

const footerFolder: FolderGroup = {
    kind: "folder",
    id: "footer",
    label: "Footer",
    count: 2,
    children: [
        { kind: "simpleField", id: "signature", label: "Signature" },
        { kind: "simpleField", id: "disclaimer", label: "Disclaimer" },
    ],
};

// ---------- Root component ----------
const TemplateStructurePanel: React.FC<{ header: FolderGroup, body: FolderGroup, footer: FolderGroup }> = ({ header, body, footer }) => {
    useEffect(() => {
        console.log(header)
    }, [header])
    return (
        <div className="min-h-screen w-full bg-slate-100">
            <div className="mx-auto w-full max-w-[760px] border border-slate-100 bg-white p-3 shadow-sm sm:p-3">
                <PanelHeader />

                <div className="mt-5">
                    <FolderSection folder={header} sectionType="header" />
                    <FolderSection folder={body} sectionType="body" />
                    <FolderSection folder={footer} sectionType="footer" />
                    {/* <AddSectionButton /> */}
                </div>

                <MetadataFooter />
                <Footer />
            </div>
        </div>
    );
};

export default TemplateStructurePanel;