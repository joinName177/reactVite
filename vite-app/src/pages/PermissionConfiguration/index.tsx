import React from "react";
import { Switch, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { AuthBlock } from "./model";
const { Text } = Typography;

interface TableDataType {
  key: string;
  module: string;
  functionName: string;
  permissionName: string;
  permissionSequence: number;
  identification: string;
  dataCode: number;
  moduleId: string;
  functionId: string;
  permissionId: string;
}

const mock = {
  "returnCode": 0,
  "returnMessage": "succeed",
  "data": [
      {
          "id": "b8635ac2-d3cd-4132-aad1-d794471dc150",
          "name": "运营主体",
          "sequence": 0,
          "functions": [
              {
                  "id": "80b96c7a-a0bc-4b96-8a6b-f1da25b4269f",
                  "name": "运营主体",
                  "sequence": 0,
                  "permissions": [
                      {
                          "id": "21235591-367c-4f96-b6a3-ae34d8b765de",
                          "name": "各运营主体权限范围",
                          "sequence": 0,
                          "identification": "member.subject",
                          "identificationName": "member.subject",
                          "dataCode": 2,
                          "fields": []
                      },
                      {
                          "id": "7a43e1df-1415-46e4-a6e6-ce3d215fe22c",
                          "name": "完备手机号",
                          "sequence": 1,
                          "identification": "member.mobile",
                          "identificationName": "member.mobile",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              }
          ]
      },
      {
          "id": "2cf2b3b8-53cb-40d2-bad8-d19d103a2986",
          "name": "会员账户管理",
          "sequence": 1,
          "functions": [
              {
                  "id": "ccbb4d67-be19-4dc1-89bf-278529fe8d7e",
                  "name": "会员账户列表",
                  "sequence": 0,
                  "permissions": [
                      {
                          "id": "9df2fd30-3b3a-465d-baf5-18c45c72230f",
                          "name": "查看会员账户列表",
                          "sequence": 0,
                          "identification": "member.list.info",
                          "identificationName": "member.list.info",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "6e4595e9-c64d-4247-9d1c-7b81eccce826",
                          "name": "批量关联标签",
                          "sequence": 1,
                          "identification": "member.list.add_label",
                          "identificationName": "member.list.add_label",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "27eb9b1e-9577-4bff-a669-9faf1930d754",
                          "name": "批量调整成长值",
                          "sequence": 2,
                          "identification": "member.list.update_growth",
                          "identificationName": "member.list.update_growth",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "bbad1522-f9dc-4e65-ad6e-7b76ffe0b68e",
                          "name": "批量调整付费等级",
                          "sequence": 3,
                          "identification": "member.list.update_grade",
                          "identificationName": "member.list.update_grade",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "e62db6f3-71ca-45f9-bcae-e87b1422ba1c",
                          "name": "批量调整积分",
                          "sequence": 4,
                          "identification": "member.list.update_integral",
                          "identificationName": "member.list.update_integral",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "8cd10f23-7a46-4bf4-8d55-4005c7032e8a",
                          "name": "批量赠送优惠券",
                          "sequence": 5,
                          "identification": "member.list.send_coupon",
                          "identificationName": "member.list.send_coupon",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "7e1cc4e5-67dc-4de6-a636-aca9b15d3865",
                          "name": "批量开通会员卡",
                          "sequence": 6,
                          "identification": "member.list.open_card",
                          "identificationName": "member.list.open_card",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "edd28730-eaa1-4b19-9a85-76c36e00c980",
                          "name": "批量修改归属门店",
                          "sequence": 7,
                          "identification": "member.list.update_store",
                          "identificationName": "member.list.update_store",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "61a19810-9386-4e7a-8ff5-534a883a162a",
                          "name": "批量禁用",
                          "sequence": 8,
                          "identification": "member.list.disable",
                          "identificationName": "member.list.disable",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "15c4a2fe-34f1-4172-b556-3a7dd74085e9",
                          "name": "批量启用",
                          "sequence": 9,
                          "identification": "member.list.enable",
                          "identificationName": "member.list.enable",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "0987cb74-9091-4e83-bddb-50d4e29be561",
                          "name": "添加会员",
                          "sequence": 10,
                          "identification": "member.list.add",
                          "identificationName": "member.list.add",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "ce36bc34-bc4b-478a-a2b5-048b65a5f655",
                          "name": "批量导入",
                          "sequence": 11,
                          "identification": "member.list.import",
                          "identificationName": "member.list.import",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "4e01a086-5f38-480e-aadc-b8078f3f6faa",
                          "name": "导出",
                          "sequence": 12,
                          "identification": "member.list.export",
                          "identificationName": "member.list.export",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "32ce45b3-985a-49f6-bbd7-4df44709f02d",
                  "name": "会员账户详情",
                  "sequence": 1,
                  "permissions": [
                      {
                          "id": "ca7a6e71-6d03-4faf-9c7a-d0c882386cb5",
                          "name": "查看会员账户详情",
                          "sequence": 0,
                          "identification": "member.info.detail",
                          "identificationName": "member.info.detail",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "75dbe7fd-3177-4ec6-b224-0ab1e8808ed0",
                          "name": "禁用",
                          "sequence": 1,
                          "identification": "member.info.disable",
                          "identificationName": "member.info.disable",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "2814744a-2904-45e2-aec9-ba325861855d",
                          "name": "启用",
                          "sequence": 2,
                          "identification": "member.info.enable",
                          "identificationName": "member.info.enable",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "606e7feb-5c76-462e-b0d9-aacdda58829f",
                          "name": "修改手机号",
                          "sequence": 3,
                          "identification": "member.info.update_phone",
                          "identificationName": "member.info.update_phone",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "9417e8ec-50d4-4f37-8dde-61c21f2539f1",
                          "name": "修改归属门店",
                          "sequence": 4,
                          "identification": "member.info.update_store",
                          "identificationName": "member.info.update_store",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "a7bb1dae-6b66-4a67-ae65-3232acc2f9cd",
                          "name": "解绑归属门店",
                          "sequence": 5,
                          "identification": "member.info.relieve_store",
                          "identificationName": "member.info.relieve_store",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "a8db0f8d-f0c3-47f8-bef5-70677489d025",
                          "name": "查看门店变更记录",
                          "sequence": 6,
                          "identification": "member.info.store_record",
                          "identificationName": "member.info.store_record",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "e4f82dee-70ef-4c39-b7d2-8eb68341d94b",
                          "name": "编辑基本信息",
                          "sequence": 7,
                          "identification": "member.info.update",
                          "identificationName": "member.info.update",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "3d78bdc0-a52e-41ef-862e-5825fdc8e26a",
                          "name": "查看会员标签",
                          "sequence": 8,
                          "identification": "member.info.lable",
                          "identificationName": "member.info.lable",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "190f3724-956b-4b32-9376-5d7a58ff7b19",
                          "name": "关联标签",
                          "sequence": 9,
                          "identification": "member.info.update_lable",
                          "identificationName": "member.info.update_lable",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "aec3c9a1-493c-4ed6-9088-d78f3ec4aef7",
                          "name": "查看关联标签记录",
                          "sequence": 10,
                          "identification": "member.info.lable_record",
                          "identificationName": "member.info.lable_record",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "82d604b7-8ba1-473f-ba14-4600aa9edea4",
                          "name": "自动关联",
                          "sequence": 11,
                          "identification": "member.info.lable_auto",
                          "identificationName": "member.info.lable_auto",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "325181d9-0845-4ea3-aa43-b4e1d5a8ef07",
                          "name": "解除关联",
                          "sequence": 12,
                          "identification": "member.info.lable_relieve",
                          "identificationName": "member.info.lable_relieve",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "fe2ed53a-cde7-4990-89fb-bd95eb73a70a",
                          "name": "查看会员等级",
                          "sequence": 13,
                          "identification": "member.info.grade",
                          "identificationName": "member.info.grade",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "bea2fa79-9a78-49ee-9545-a3b074221f4e",
                          "name": "查看免费会员",
                          "sequence": 14,
                          "identification": "member.info.grade_list",
                          "identificationName": "member.info.grade_list",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "f7113615-7a03-465f-844b-0e6a8eb3bb8c",
                          "name": "导出成长明细",
                          "sequence": 15,
                          "identification": "member.info.export_growth",
                          "identificationName": "member.info.export_growth",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "12ab1cc3-5b8b-419a-b0a9-98e3f167f954",
                          "name": "调整成长值",
                          "sequence": 16,
                          "identification": "member.info.update_growth",
                          "identificationName": "member.info.update_growth",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "4af1519e-4431-407d-9774-3025b1553338",
                          "name": "查看付费会员",
                          "sequence": 17,
                          "identification": "member.info.paid_grade_list",
                          "identificationName": "member.info.paid_grade_list",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "0a79c6f7-172a-4431-8d90-56c1f2c465b6",
                          "name": "调整付费等级",
                          "sequence": 18,
                          "identification": "member.info.update_grade",
                          "identificationName": "member.info.update_grade",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "6016f2f2-4c9d-4a9d-b5c7-4e7ac6f93415",
                          "name": "查看权益记录",
                          "sequence": 19,
                          "identification": "member.info.grade_equities_record",
                          "identificationName": "member.info.grade_equities_record",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "f3a1a271-f5a8-4117-82d0-38729f2a0f0c",
                          "name": "查看积分明细",
                          "sequence": 20,
                          "identification": "member.info.member_integral_detail",
                          "identificationName": "member.info.member_integral_detail",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "51d2513e-c9a3-46c4-9287-af4d8084d41a",
                          "name": "导出积分明细",
                          "sequence": 21,
                          "identification": "member.info.member_integral_export",
                          "identificationName": "member.info.member_integral_export",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "800bd4d9-a3de-4108-9c76-2201a01ed28d",
                          "name": "调整积分",
                          "sequence": 22,
                          "identification": "member.info.update_member_integral",
                          "identificationName": "member.info.update_member_integral",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "2024637b-ada2-4057-a3ec-c3d67a9fbd5e",
                          "name": "查看账户会员卡",
                          "sequence": 23,
                          "identification": "member.info.card_list",
                          "identificationName": "member.info.card_list",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "18553feb-d28c-415b-bc90-d2e9a95e52dd",
                          "name": "开通会员卡",
                          "sequence": 24,
                          "identification": "member.info.open_card",
                          "identificationName": "member.info.open_card",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "ad4dad7f-2c7a-4d84-b5c7-dcb08b261b4b",
                          "name": "调整卡余额",
                          "sequence": 25,
                          "identification": "member.info.update_card_balance",
                          "identificationName": "member.info.update_card_balance",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "9db98972-4484-4616-90df-5ee7cec35b4a",
                          "name": "调整适用范围",
                          "sequence": 26,
                          "identification": "member.info.update_card_scope",
                          "identificationName": "member.info.update_card_scope",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "403772ec-3f9e-4753-b503-144007e277fd",
                          "name": "修改卡密码",
                          "sequence": 27,
                          "identification": "member.info.update_card_password",
                          "identificationName": "member.info.update_card_password",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "1f69d4a1-45ea-4226-bcce-5473294ff0f1",
                          "name": "冻结",
                          "sequence": 28,
                          "identification": "member.info.freeze_card",
                          "identificationName": "member.info.freeze_card",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "c335b80e-47bb-4bd4-ae22-372bb3b1292b",
                          "name": "解冻",
                          "sequence": 29,
                          "identification": "member.info.thaw_card",
                          "identificationName": "member.info.thaw_card",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "b1e807ff-95d0-4ca1-84b3-17300f5cfbb1",
                          "name": "查看会员卡详情",
                          "sequence": 30,
                          "identification": "member.info.card_info",
                          "identificationName": "member.info.card_info",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "99f6f2ff-8c14-4b71-84cc-4e32c7837600",
                          "name": "绑定实体卡",
                          "sequence": 31,
                          "identification": "member.info.bind_card",
                          "identificationName": "member.info.bind_card",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "da17df06-b897-4b5d-a62c-eda8f011994a",
                          "name": "开通电子卡",
                          "sequence": 32,
                          "identification": "member.info.open_electric_card",
                          "identificationName": "member.info.open_electric_card",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "75354e91-c6f8-4ace-b4db-98b87e548c44",
                          "name": "实体卡退卡",
                          "sequence": 33,
                          "identification": "member.info.return_card",
                          "identificationName": "member.info.return_card",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "9c1ab83f-5979-485a-8491-13fd4c3d6591",
                          "name": "查看优惠券",
                          "sequence": 34,
                          "identification": "member.info.coupon_list",
                          "identificationName": "member.info.coupon_list",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "c0c850bb-a857-4537-b76c-02da2a4d4d13",
                          "name": "赠送优惠券",
                          "sequence": 35,
                          "identification": "member.info.send_coupon",
                          "identificationName": "member.info.send_coupon",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "f82ad7e6-2fe3-49b7-8cd7-5edf63830a59",
                          "name": "导出优惠券",
                          "sequence": 36,
                          "identification": "member.info.export_coupon",
                          "identificationName": "member.info.export_coupon",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "ebd88f73-0240-499f-b2dc-1f7721035b89",
                          "name": "查看交易明细",
                          "sequence": 37,
                          "identification": "member.info.consumption",
                          "identificationName": "member.info.consumption",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "600b8222-d2ed-460b-a4d1-fadd5fb2f24c",
                          "name": "消费订单",
                          "sequence": 38,
                          "identification": "member.info.consumption_list",
                          "identificationName": "member.info.consumption_list",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "c912e566-1ed0-49ef-ac4e-f636a4344c69",
                          "name": "充值订单",
                          "sequence": 39,
                          "identification": "member.info.recharge_list",
                          "identificationName": "member.info.recharge_list",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              }
          ]
      },
      {
          "id": "471f2de5-2f6e-4b05-9a0e-efbb53873934",
          "name": "会员积分",
          "sequence": 2,
          "functions": [
              {
                  "id": "0f884044-e561-4cdf-ab6a-194af7a394bb",
                  "name": "积分任务",
                  "sequence": 0,
                  "permissions": [
                      {
                          "id": "e4fffb29-6fbb-4b81-a9f2-b08fd42fd68c",
                          "name": "查看任务",
                          "sequence": 0,
                          "identification": "member.integral.task",
                          "identificationName": "member.integral.task",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "38533f67-613c-4d4e-a882-7ce362ea74e9",
                          "name": "创建任务",
                          "sequence": 1,
                          "identification": "member.integral.add_task",
                          "identificationName": "member.integral.add_task",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "72773435-657a-4532-be4d-f0ab8a644185",
                          "name": "查看任务记录",
                          "sequence": 2,
                          "identification": "member.integral.task_record",
                          "identificationName": "member.integral.task_record",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "78915417-bf50-4d0d-b127-915b60991b72",
                          "name": "停止",
                          "sequence": 3,
                          "identification": "member.integral.stop_task",
                          "identificationName": "member.integral.stop_task",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "217741e5-81bd-429c-83fa-b5c30b766fcc",
                          "name": "启动",
                          "sequence": 4,
                          "identification": "member.integral.start_task",
                          "identificationName": "member.integral.start_task",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "2485c8e6-4296-4a03-8774-8a9701545c98",
                          "name": "详情",
                          "sequence": 5,
                          "identification": "member.integral.task_detail",
                          "identificationName": "member.integral.task_detail",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "b916689f-4784-4f99-8cd7-79a48d5e3b97",
                          "name": "排序",
                          "sequence": 6,
                          "identification": "member.integral.task_sort",
                          "identificationName": "member.integral.task_sort",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "07853286-8ab9-43e0-a75d-8766ccb0edbb",
                          "name": "编辑",
                          "sequence": 7,
                          "identification": "member.integral.update_task",
                          "identificationName": "member.integral.update_task",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "5b15ae4a-8d0c-401d-8e55-3483782fd37e",
                          "name": "删除",
                          "sequence": 8,
                          "identification": "member.integral.delete_task",
                          "identificationName": "member.integral.delete_task",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "58edc0d6-417b-49e6-95d1-ecf3de107659",
                  "name": "通用规则",
                  "sequence": 1,
                  "permissions": [
                      {
                          "id": "42a0c397-c3a4-4776-af45-e1ba7dba6092",
                          "name": "查看规则",
                          "sequence": 0,
                          "identification": "member.integral.rule",
                          "identificationName": "member.integral.rule",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "ce5557dc-c92d-459d-8383-2381125c26be",
                          "name": "编辑",
                          "sequence": 1,
                          "identification": "member.integral.update_rule",
                          "identificationName": "member.integral.update_rule",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "341e6943-ed05-4569-aa7d-e5a859fe379c",
                  "name": "消耗规则",
                  "sequence": 2,
                  "permissions": [
                      {
                          "id": "157434df-dd38-40f4-b087-7a9bad748377",
                          "name": "查看规则",
                          "sequence": 0,
                          "identification": "member.integral.consume_rule",
                          "identificationName": "member.integral.consume_rule",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "07137519-8cae-462e-8d44-c382e2a5b908",
                          "name": "编辑",
                          "sequence": 1,
                          "identification": "member.integral.update_consume_rule",
                          "identificationName": "member.integral.update_consume_rule",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              }
          ]
      },
      {
          "id": "b0b99723-6826-4171-8c62-ce020511b156",
          "name": "会员标签",
          "sequence": 3,
          "functions": [
              {
                  "id": "7558a7d8-88e5-4f5f-a61b-dbf36f17a0f5",
                  "name": "会员标签管理",
                  "sequence": 0,
                  "permissions": [
                      {
                          "id": "101faee4-2837-429f-82b5-e1d9164e3390",
                          "name": "查看会员标签管理",
                          "sequence": 0,
                          "identification": "member.lable.list",
                          "identificationName": "member.lable.list",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "e0e42833-2c31-4b17-a642-7cd291b7b1ef",
                          "name": "导出",
                          "sequence": 1,
                          "identification": "member.lable.export",
                          "identificationName": "member.lable.export",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "f846b4d9-50b8-4728-a5d3-6be8355d6d3f",
                          "name": "新增标签",
                          "sequence": 2,
                          "identification": "member.lable.add",
                          "identificationName": "member.lable.add",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "bab3d7a2-5b71-43d0-bf62-db6a455a42b9",
                          "name": "禁用",
                          "sequence": 3,
                          "identification": "member.lable.disable",
                          "identificationName": "member.lable.disable",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "3dd3f182-4554-465b-965b-ffde30ade676",
                          "name": "启用",
                          "sequence": 4,
                          "identification": "member.lable.enable",
                          "identificationName": "member.lable.enable",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "df5ef1cf-e7c5-4583-b71f-53403049a90d",
                          "name": "查看标签详情",
                          "sequence": 5,
                          "identification": "member.lable.detail",
                          "identificationName": "member.lable.detail",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "9d643530-10a3-4832-ab57-3f87196474f2",
                          "name": "编辑标签",
                          "sequence": 6,
                          "identification": "member.lable.update",
                          "identificationName": "member.lable.update",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "71e10b46-826b-4c2f-8f72-f71bd718770a",
                          "name": "删除标签",
                          "sequence": 7,
                          "identification": "member.lable.delete",
                          "identificationName": "member.lable.delete",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "cc2ef0b3-0424-4133-a249-98517ea44ea6",
                  "name": "标签关联会员",
                  "sequence": 1,
                  "permissions": [
                      {
                          "id": "14352a52-96aa-40a8-8475-cc21e8b8fbc3",
                          "name": "查看标签关联会员",
                          "sequence": 0,
                          "identification": "member.lable.list_member",
                          "identificationName": "member.lable.list_member",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "e0227655-0ec5-47c9-a9b4-078dd0212c73",
                          "name": "新增关联会员",
                          "sequence": 1,
                          "identification": "member.lable.add_member",
                          "identificationName": "member.lable.add_member",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "56f4a298-f167-417e-b426-310a85eff848",
                          "name": "批量自动关联",
                          "sequence": 2,
                          "identification": "member.lable.auto",
                          "identificationName": "member.lable.auto",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "f8cdd5b4-e9cd-4686-9b65-bf12a2a3ea10",
                          "name": "批量解除关联",
                          "sequence": 3,
                          "identification": "member.lable.relieve",
                          "identificationName": "member.lable.relieve",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "eea26a42-7177-49b5-9a25-039db4a8f6b1",
                          "name": "导出",
                          "sequence": 4,
                          "identification": "member.lable.export_member",
                          "identificationName": "member.lable.export_member",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              }
          ]
      },
      {
          "id": "f6432ecb-4b31-4c7d-87f6-06eeb1e33a73",
          "name": "会员等级",
          "sequence": 4,
          "functions": [
              {
                  "id": "8eda8c24-5c6b-485a-9de4-6f7206e15385",
                  "name": "会员等级",
                  "sequence": 0,
                  "permissions": [
                      {
                          "id": "07999a0a-373d-4485-9709-afd10bd5df60",
                          "name": "会员等级开关",
                          "sequence": 0,
                          "identification": "member.grade.switch",
                          "identificationName": "member.grade.switch",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "668f87d8-565c-4fea-83d0-ac227e5c8cc1",
                  "name": "免费会员",
                  "sequence": 1,
                  "permissions": [
                      {
                          "id": "b135a5e5-61b3-4f1c-92f9-182d67007d0f",
                          "name": "查看等级规则",
                          "sequence": 0,
                          "identification": "member.grade.rule",
                          "identificationName": "member.grade.rule",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "42d54908-a977-47d5-80b5-cb93e4b15e19",
                          "name": "新增等级",
                          "sequence": 1,
                          "identification": "member.grade.add",
                          "identificationName": "member.grade.add",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "3a8688ad-9537-42ae-9996-b174b1693bbd",
                          "name": "详情",
                          "sequence": 2,
                          "identification": "member.grade.detail",
                          "identificationName": "member.grade.detail",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "ab7968c3-128a-4193-ab1b-f6ddb2df50a7",
                          "name": "编辑",
                          "sequence": 3,
                          "identification": "member.grade.update",
                          "identificationName": "member.grade.update",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "1cb4deae-6028-4595-a8a5-b33488f58bd8",
                          "name": "更新会员等级",
                          "sequence": 4,
                          "identification": "member.grade.update_member",
                          "identificationName": "member.grade.update_member",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "a1df7692-d1c8-4f51-8e42-cc740e173d4d",
                          "name": "删除",
                          "sequence": 5,
                          "identification": "member.grade.delete",
                          "identificationName": "member.grade.delete",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "a9fd65af-21c3-44b2-90e1-8abd47ff74c5",
                          "name": "查看等级用户",
                          "sequence": 6,
                          "identification": "member.grade.member_list",
                          "identificationName": "member.grade.member_list",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "79f1ec28-996c-486d-a7dc-c06844da0aa4",
                          "name": "导出等级用户",
                          "sequence": 7,
                          "identification": "member.grade.export_member_list",
                          "identificationName": "member.grade.export_member_list",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "938a4882-a03d-4dc6-bd5a-0657bf66b0a5",
                          "name": "调整成长值",
                          "sequence": 8,
                          "identification": "member.grade.update_member_growth",
                          "identificationName": "member.grade.update_member_growth",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "1884f26a-4015-492b-bba9-c9dc782ee762",
                  "name": "付费会员",
                  "sequence": 2,
                  "permissions": [
                      {
                          "id": "ef8fbd82-6457-4763-8beb-01b5205c68b2",
                          "name": "查看等级规则",
                          "sequence": 0,
                          "identification": "member.grade.paid.rule",
                          "identificationName": "member.grade.paid.rule",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "fcf7e15e-1bb0-4228-a08a-e413d10b2094",
                          "name": "新增等级",
                          "sequence": 1,
                          "identification": "member.grade.paid.add",
                          "identificationName": "member.grade.paid.add",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "df92d9f2-ba78-425d-aae1-79ff04fccc52",
                          "name": "详情",
                          "sequence": 2,
                          "identification": "member.grade.paid.detail",
                          "identificationName": "member.grade.paid.detail",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "ca6519ab-dfe2-4e51-97fd-fe0de966e3e3",
                          "name": "编辑",
                          "sequence": 3,
                          "identification": "member.grade.paid.update",
                          "identificationName": "member.grade.paid.update",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "a78aa3c2-7db0-4a7a-aec3-dc4f0077ba4d",
                          "name": "更新会员等级",
                          "sequence": 4,
                          "identification": "member.grade.paid.update_member",
                          "identificationName": "member.grade.paid.update_member",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "58e0de6f-7894-4cb1-af5e-567379a054ab",
                          "name": "删除",
                          "sequence": 5,
                          "identification": "member.grade.paid.delete",
                          "identificationName": "member.grade.paid.delete",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "a05e4924-40ed-4c3a-a0bd-cfc79df1d3f8",
                          "name": "查看等级用户",
                          "sequence": 6,
                          "identification": "member.grade.paid.member_list",
                          "identificationName": "member.grade.paid.member_list",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "3c66ff5d-b7f0-4aa0-ad6f-86cdc7308365",
                          "name": "导出等级用户",
                          "sequence": 7,
                          "identification": "member.grade.paid.export_member_list",
                          "identificationName": "member.grade.paid.export_member_list",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "24957968-47b9-41f4-ae4b-f407ff4bf03a",
                          "name": "付费记录",
                          "sequence": 8,
                          "identification": "member.grade.paid.update_member_growth",
                          "identificationName": "member.grade.paid.update_member_growth",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "b7bb21b0-74e3-409b-9367-e249ae69a57a",
                  "name": "等级权益说明",
                  "sequence": 3,
                  "permissions": [
                      {
                          "id": "6d9e20a4-85d6-400a-9282-1adc5d4a6bba",
                          "name": "查看等级权益说明",
                          "sequence": 0,
                          "identification": "member.grade.equities_explain",
                          "identificationName": "member.grade.equities_explain",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "56a77e48-d592-4d61-becd-a83aa523665e",
                          "name": "编辑",
                          "sequence": 1,
                          "identification": "member.grade.update_equities_explain",
                          "identificationName": "member.grade.update_equities_explain",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              }
          ]
      },
      {
          "id": "c821e8cb-cce1-4775-b7fd-f6ab1b1db2e2",
          "name": "等级成长值",
          "sequence": 5,
          "functions": [
              {
                  "id": "f2fa3ef6-d275-48c6-b3ab-19f5beb46542",
                  "name": "成长值任务",
                  "sequence": 0,
                  "permissions": [
                      {
                          "id": "0f0f0aa6-72aa-4263-a3bb-ececea0a253d",
                          "name": "查看任务",
                          "sequence": 0,
                          "identification": "member.growth.task",
                          "identificationName": "member.growth.task",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "59650438-39fd-44e1-afa6-8c99dd4c31e6",
                          "name": "创建任务",
                          "sequence": 1,
                          "identification": "member.growth.add_task",
                          "identificationName": "member.growth.add_task",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "e76e25b4-3131-426a-927d-ecff24fbf92d",
                          "name": "查看任务记录",
                          "sequence": 2,
                          "identification": "member.growth.task_record",
                          "identificationName": "member.growth.task_record",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "37092d75-2c16-439a-afee-c008ffd9682e",
                          "name": "停止",
                          "sequence": 3,
                          "identification": "member.growth.stop_task",
                          "identificationName": "member.growth.stop_task",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "093ee070-af1f-4074-a789-955f304eb66a",
                          "name": "启动",
                          "sequence": 4,
                          "identification": "member.growth.start_task",
                          "identificationName": "member.growth.start_task",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "43ac6d08-8cea-44c1-b75c-c85cc59d651a",
                          "name": "详情",
                          "sequence": 5,
                          "identification": "member.growth.task_detail",
                          "identificationName": "member.growth.task_detail",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "02b7634d-9ce9-4616-8d85-23dd697130d8",
                          "name": "排序",
                          "sequence": 6,
                          "identification": "member.growth.task_sort",
                          "identificationName": "member.growth.task_sort",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "2edf4633-2d2e-4449-9904-be2088d51e25",
                          "name": "编辑",
                          "sequence": 7,
                          "identification": "member.growth.update_task",
                          "identificationName": "member.growth.update_task",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "c4a3adf8-9494-4aec-b887-349f86c68eb7",
                          "name": "删除",
                          "sequence": 8,
                          "identification": "member.growth.delete_task",
                          "identificationName": "member.growth.delete_task",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "eb170e55-400c-4456-ad48-f3caab1cbff6",
                  "name": "成长值规则",
                  "sequence": 1,
                  "permissions": [
                      {
                          "id": "64cc7c9a-3b84-455c-af8d-04a5862bedf1",
                          "name": "查看成长值规则",
                          "sequence": 0,
                          "identification": "member.growth.rule",
                          "identificationName": "member.growth.rule",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "d532368a-8000-48d6-8e0c-ac69c5175961",
                          "name": "编辑",
                          "sequence": 1,
                          "identification": "member.growth.update_rule",
                          "identificationName": "member.growth.update_rule",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              }
          ]
      },
      {
          "id": "526d5bed-691b-4aa8-b939-cef272a46635",
          "name": "会员卡管理",
          "sequence": 6,
          "functions": [
              {
                  "id": "8fed9a84-4d54-4b31-828d-270458b97460",
                  "name": "会员卡规则",
                  "sequence": 0,
                  "permissions": [
                      {
                          "id": "18ab28a5-1542-4075-a56e-c9fcd9fd6905",
                          "name": "查看会员卡余额规则",
                          "sequence": 0,
                          "identification": "member.card.balance_rule",
                          "identificationName": "member.card.balance_rule",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "cce5a56c-173b-4f40-a5ba-c7b1430786aa",
                          "name": "编辑会员卡余额规则",
                          "sequence": 1,
                          "identification": "member.card.update_balance_rule",
                          "identificationName": "member.card.update_balance_rule",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "1de41090-d2ec-4681-8442-dc3d2df3efd9",
                          "name": "查看默认充值规则",
                          "sequence": 2,
                          "identification": "member.card.recharge_rule",
                          "identificationName": "member.card.recharge_rule",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "16add4f2-7037-4600-87b1-28d32e58109f",
                          "name": "编辑默认充值规则",
                          "sequence": 3,
                          "identification": "member.card.update_recharge_rule",
                          "identificationName": "member.card.update_recharge_rule",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "4c0111ca-4ed1-4f10-9913-c22360676c32",
                          "name": "查看实体卡押金策略",
                          "sequence": 4,
                          "identification": "member.card.deposit_strategy",
                          "identificationName": "member.card.deposit_strategy",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "7e0d6828-aee4-484c-98be-fbc3e17538ae",
                          "name": "编辑实体卡押金策略",
                          "sequence": 5,
                          "identification": "member.card.update_deposit_strategy",
                          "identificationName": "member.card.update_deposit_strategy",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "2b816dcb-3ca7-499a-9da6-fcd94b712d9b",
                  "name": "会员卡管理",
                  "sequence": 1,
                  "permissions": [
                      {
                          "id": "1c31a85e-b7ec-458a-a925-529b6db3757d",
                          "name": "查看会员卡管理",
                          "sequence": 0,
                          "identification": "member.card.list",
                          "identificationName": "member.card.list",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "08ad74d7-b569-4a3d-aa14-0cda7743507f",
                          "name": "新建会员卡",
                          "sequence": 1,
                          "identification": "member.card.add",
                          "identificationName": "member.card.add",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "4346657e-ea36-44e6-aa13-0f3369683a54",
                          "name": "生成实体卡",
                          "sequence": 2,
                          "identification": "member.card.create_physical",
                          "identificationName": "member.card.create_physical",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "b03b2670-3ca1-4c6b-ae5e-4cff080fa807",
                          "name": "编辑会员卡",
                          "sequence": 3,
                          "identification": "member.card.update",
                          "identificationName": "member.card.update",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "824f8369-62bd-44c2-9e31-144d2c565a5f",
                          "name": "查看会员卡详情",
                          "sequence": 4,
                          "identification": "member.card.detail",
                          "identificationName": "member.card.detail",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "65fae475-031e-401f-97bd-7547bbbbb007",
                          "name": "停发",
                          "sequence": 5,
                          "identification": "member.card.stop_send",
                          "identificationName": "member.card.stop_send",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "fdceebb5-0848-43c8-8bc4-fec94f1e3824",
                          "name": "恢复发放",
                          "sequence": 6,
                          "identification": "member.card.start_send",
                          "identificationName": "member.card.start_send",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "e808698e-836c-48f1-b3f4-b226f83fdec4",
                          "name": "禁用",
                          "sequence": 7,
                          "identification": "member.card.disable",
                          "identificationName": "member.card.disable",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "0bad9d4c-467a-444a-a9aa-cf048e029688",
                          "name": "启用",
                          "sequence": 8,
                          "identification": "member.card.enable",
                          "identificationName": "member.card.enable",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "5913fab2-9564-4895-b22b-7dc0f39b88a4",
                          "name": "开卡二维码",
                          "sequence": 9,
                          "identification": "member.card.open_qrcode",
                          "identificationName": "member.card.open_qrcode",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "610d52fc-ad6f-43ac-81f2-3788467410d3",
                          "name": "查看已领卡",
                          "sequence": 10,
                          "identification": "member.card.member_card",
                          "identificationName": "member.card.member_card",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "4192189c-ef72-40df-9155-1f6d242661d5",
                  "name": "已领会员卡",
                  "sequence": 2,
                  "permissions": [
                      {
                          "id": "fa82639f-4084-4a37-a8bb-835ce615baed",
                          "name": "查看已领会员卡",
                          "sequence": 0,
                          "identification": "member.member_card.list",
                          "identificationName": "member.member_card.list",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "303ac392-66d1-44cb-8129-d84adc7fc59e",
                          "name": "调整余额",
                          "sequence": 1,
                          "identification": "member.member_card.update_card_balance",
                          "identificationName": "member.member_card.update_card_balance",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "64898044-0042-413f-8a64-0727779c9914",
                          "name": "调整适用范围",
                          "sequence": 2,
                          "identification": "member.member_card.update_card_scope",
                          "identificationName": "member.member_card.update_card_scope",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "be21d44b-1e39-43bd-afb3-a03be46bf8ae",
                          "name": "修改密码",
                          "sequence": 3,
                          "identification": "member.member_card.update_password",
                          "identificationName": "member.member_card.update_password",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "b6276dc1-d904-4968-93ac-9cc5a0978796",
                          "name": "冻结",
                          "sequence": 4,
                          "identification": "member.member_card.freeze_card",
                          "identificationName": "member.member_card.freeze_card",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "2fd2475d-6845-4bda-9f5b-7b00f63a6657",
                          "name": "解冻",
                          "sequence": 5,
                          "identification": "member.member_card.thaw_card",
                          "identificationName": "member.member_card.thaw_card",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "5665a90d-9ec5-4d2f-9ae5-a4534849fbb0",
                          "name": "导出",
                          "sequence": 6,
                          "identification": "member.member_card.export",
                          "identificationName": "member.member_card.export",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "a5a4cade-694b-4f09-a178-900e2671d07a",
                          "name": "查看已领卡详情",
                          "sequence": 7,
                          "identification": "member.member_card.detail",
                          "identificationName": "member.member_card.detail",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "06b6fa4b-6891-4966-86b9-3c0a946d8510",
                          "name": "绑定实体卡",
                          "sequence": 8,
                          "identification": "member.member_card.bind_card",
                          "identificationName": "member.member_card.bind_card",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "272c1bd4-4e7d-49c2-bc58-e37ddfa640fd",
                          "name": "绑定账户",
                          "sequence": 9,
                          "identification": "member.member_card.bind_account",
                          "identificationName": "member.member_card.bind_account",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "9a3aede3-3800-4b6d-9704-d3e5e8d1821a",
                          "name": "开通电子卡",
                          "sequence": 10,
                          "identification": "member.member_card.open_electric_card",
                          "identificationName": "member.member_card.open_electric_card",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "b26cad58-5917-42ee-ae7a-52bbeaf2688f",
                          "name": "实体卡退卡",
                          "sequence": 11,
                          "identification": "member.member_card.return_card",
                          "identificationName": "member.member_card.return_card",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "2e58afc4-91b9-424d-9f29-1355eaf10b1d",
                  "name": "会员卡余额记录",
                  "sequence": 3,
                  "permissions": [
                      {
                          "id": "dacc03ef-ffca-47aa-b485-85c60d8951c8",
                          "name": "查看会员卡余额记录",
                          "sequence": 0,
                          "identification": "member.member_card.consumption",
                          "identificationName": "member.member_card.consumption",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "7c7f2304-27e3-4501-8248-ea479c22c868",
                          "name": "导出",
                          "sequence": 1,
                          "identification": "member.member_card.export_consumption",
                          "identificationName": "member.member_card.export_consumption",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "80e2c129-5335-4517-a6ce-7b2a996bbf42",
                          "name": "退款",
                          "sequence": 2,
                          "identification": "member.member_card.refund",
                          "identificationName": "member.member_card.refund",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              }
          ]
      },
      {
          "id": "ed869fcc-8c67-4a96-8705-cdf3c484da45",
          "name": "会员设置",
          "sequence": 7,
          "functions": [
              {
                  "id": "23c4cd4b-bdc0-4b90-b05c-1b143cc31a98",
                  "name": "资料项设置",
                  "sequence": 0,
                  "permissions": [
                      {
                          "id": "e95e0fd4-d836-4e95-84a0-109f4dbd21d5",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "member.setting.data_item",
                          "identificationName": "member.setting.data_item",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "b637f082-2e5d-42b3-8327-7433db793394",
                          "name": "添加自定义资料",
                          "sequence": 1,
                          "identification": "member.setting.add_data_item",
                          "identificationName": "member.setting.add_data_item",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "f4384345-d833-44e6-b6d0-c86abaaf04cb",
                          "name": "编辑",
                          "sequence": 2,
                          "identification": "member.setting.update_data_item",
                          "identificationName": "member.setting.update_data_item",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "38deb1a5-e8de-4f2e-a7ea-dfa235ab379d",
                  "name": "会员通",
                  "sequence": 1,
                  "permissions": [
                      {
                          "id": "5f873a80-08b1-4a21-9188-9560b56c6805",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "member.setting.unilink",
                          "identificationName": "member.setting.unilink",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "267f74a7-110b-4890-b387-fb4d73f9cabe",
                          "name": "编辑",
                          "sequence": 1,
                          "identification": "member.setting.update_unilink",
                          "identificationName": "member.setting.update_unilink",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "fe79c072-1652-4930-b726-0e50a936aa27",
                  "name": "账户设置",
                  "sequence": 2,
                  "permissions": [
                      {
                          "id": "38cf1106-f633-443d-a00c-39542fdd0067",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "member.setting.account",
                          "identificationName": "member.setting.account",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "cbf6e10c-9508-4c58-849c-1c2f2104535d",
                          "name": "编辑",
                          "sequence": 1,
                          "identification": "member.setting.update_account",
                          "identificationName": "member.setting.update_account",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "192991a9-cb0f-4dbb-9c07-aedb76312152",
                  "name": "消息配置",
                  "sequence": 3,
                  "permissions": [
                      {
                          "id": "69282002-ee65-4a4a-8d8f-af2e863036e8",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "member.setting.msg",
                          "identificationName": "member.setting.msg",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "63da94b7-520e-453d-b6ab-bf3d126bfb74",
                          "name": "编辑",
                          "sequence": 1,
                          "identification": "member.setting.update_msg",
                          "identificationName": "member.setting.update_msg",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              }
          ]
      },
      {
          "id": "553681f3-ed3e-490b-bbe5-81600ee093e6",
          "name": "小程序装修",
          "sequence": 8,
          "functions": [
              {
                  "id": "11ef5a32-5343-4e4c-b28c-d97f032ceb6b",
                  "name": "商城模板",
                  "sequence": 0,
                  "permissions": [
                      {
                          "id": "e17a8109-7418-406f-afbe-85279642d900",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "s2b2c.miniprogram_mall_template.template_view",
                          "identificationName": "s2b2c.miniprogram_mall_template.template_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "fd8909d2-d11e-4570-9597-45722ce9035b",
                          "name": "新增",
                          "sequence": 1,
                          "identification": "s2b2c.miniprogram_mall_template.template_create",
                          "identificationName": "s2b2c.miniprogram_mall_template.template_create",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "42ab57db-1bad-4850-8245-e6a7fe7bc114",
                          "name": "编辑",
                          "sequence": 2,
                          "identification": "s2b2c.miniprogram_mall_template.template_edit",
                          "identificationName": "s2b2c.miniprogram_mall_template.template_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "6a11cbe9-1b9b-418b-8eeb-8ee3f4193220",
                          "name": "复制",
                          "sequence": 3,
                          "identification": "s2b2c.miniprogram_mall_template.template_copy",
                          "identificationName": "s2b2c.miniprogram_mall_template.template_copy",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "0569b078-d382-49cc-b7e8-651f1f001d51",
                          "name": "删除",
                          "sequence": 4,
                          "identification": "s2b2c.miniprogram_mall_template.template_delete",
                          "identificationName": "s2b2c.miniprogram_mall_template.template_delete",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "99088874-ba3b-4ec2-9790-d3accd79e0a9",
                  "name": "商城首页-推荐",
                  "sequence": 1,
                  "permissions": [
                      {
                          "id": "30486f03-441c-4efe-abbc-af39fb9f9be5",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "s2b2c.miniprogram_mall_home_recommend.home_view",
                          "identificationName": "s2b2c.miniprogram_mall_home_recommend.home_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "bf864678-9709-4d94-b649-67372954cffa",
                          "name": "新增",
                          "sequence": 1,
                          "identification": "s2b2c.miniprogram_mall_home_recommend.home_create",
                          "identificationName": "s2b2c.miniprogram_mall_home_recommend.home_create",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "34d7ef27-e6c9-4b99-b5ac-53bd7a3ce6ce",
                          "name": "编辑",
                          "sequence": 2,
                          "identification": "s2b2c.miniprogram_mall_home_recommend.home_edit",
                          "identificationName": "s2b2c.miniprogram_mall_home_recommend.home_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "9521d950-0992-48db-a573-392c9d079444",
                          "name": "复制",
                          "sequence": 3,
                          "identification": "s2b2c.miniprogram_mall_home_recommend.home_copy",
                          "identificationName": "s2b2c.miniprogram_mall_home_recommend.home_copy",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "03b763af-e463-4f34-a006-75bde6aaf853",
                          "name": "删除",
                          "sequence": 4,
                          "identification": "s2b2c.miniprogram_mall_home_recommend.home_delete",
                          "identificationName": "s2b2c.miniprogram_mall_home_recommend.home_delete",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "376bc4e2-3d0d-4b4e-abc7-c902b6772c74",
                  "name": "商城首页-同城",
                  "sequence": 2,
                  "permissions": [
                      {
                          "id": "905ab074-bbda-451e-9f01-5971df76e097",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "s2b2c.miniprogram_mall_home_same_city.home_view",
                          "identificationName": "s2b2c.miniprogram_mall_home_same_city.home_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "f25ef5d5-f871-4ce3-a71f-cb6f5e0d614c",
                          "name": "新增",
                          "sequence": 1,
                          "identification": "s2b2c.miniprogram_mall_home_same_city.home_create",
                          "identificationName": "s2b2c.miniprogram_mall_home_same_city.home_create",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "cf7b6c3c-085c-43ef-88a6-67da154cf51c",
                          "name": "编辑",
                          "sequence": 2,
                          "identification": "s2b2c.miniprogram_mall_home_same_city.home_edit",
                          "identificationName": "s2b2c.miniprogram_mall_home_same_city.home_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "14b416fe-97a2-4a59-9fcb-fb1370ebb7d8",
                          "name": "复制",
                          "sequence": 3,
                          "identification": "s2b2c.miniprogram_mall_home_same_city.home_copy",
                          "identificationName": "s2b2c.miniprogram_mall_home_same_city.home_copy",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "61917a61-a051-4af0-a745-db6db001be24",
                          "name": "删除",
                          "sequence": 4,
                          "identification": "s2b2c.miniprogram_mall_home_same_city.home_delete",
                          "identificationName": "s2b2c.miniprogram_mall_home_same_city.home_delete",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "ef128c32-517e-4226-bb2f-7bdba2873495",
                  "name": "商品分类",
                  "sequence": 3,
                  "permissions": [
                      {
                          "id": "03d3603f-4d14-4140-ba3e-88656b787c89",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "s2b2c.miniprogram_product_category.category_view",
                          "identificationName": "s2b2c.miniprogram_product_category.category_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "4a2f7112-1f19-437f-abdb-5a63529e1706",
                          "name": "新增",
                          "sequence": 1,
                          "identification": "s2b2c.miniprogram_product_category.category_create",
                          "identificationName": "s2b2c.miniprogram_product_category.category_create",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "a09d65ba-aa15-4842-a1cc-93f3b0283920",
                          "name": "编辑",
                          "sequence": 2,
                          "identification": "s2b2c.miniprogram_product_category.category_edit",
                          "identificationName": "s2b2c.miniprogram_product_category.category_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "4a2d7325-74b1-43f3-947a-6f4e1a256c39",
                          "name": "复制",
                          "sequence": 3,
                          "identification": "s2b2c.miniprogram_product_category.category_copy",
                          "identificationName": "s2b2c.miniprogram_product_category.category_copy",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "be6b2337-c966-4b93-a680-ef9a07c1dd92",
                          "name": "删除",
                          "sequence": 4,
                          "identification": "s2b2c.miniprogram_product_category.category_delete",
                          "identificationName": "s2b2c.miniprogram_product_category.category_delete",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "0c8f1d46-8c90-4ed8-aefc-c02b8913d74c",
                  "name": "底部导航",
                  "sequence": 4,
                  "permissions": [
                      {
                          "id": "8ff41ff0-5229-4c31-83c7-3a9b15b19867",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "s2b2c.miniprogram_bottom_navigation.navigation_view",
                          "identificationName": "s2b2c.miniprogram_bottom_navigation.navigation_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "8fe5d4d3-1c7c-41b3-94a1-43b8bfd00f84",
                          "name": "新增",
                          "sequence": 1,
                          "identification": "s2b2c.miniprogram_bottom_navigation.navigation_create",
                          "identificationName": "s2b2c.miniprogram_bottom_navigation.navigation_create",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "1b0e5d5d-4908-4456-a24a-b6adb52fad82",
                          "name": "编辑",
                          "sequence": 2,
                          "identification": "s2b2c.miniprogram_bottom_navigation.navigation_edit",
                          "identificationName": "s2b2c.miniprogram_bottom_navigation.navigation_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "5ea359be-d420-4a3a-b355-39d51731f349",
                          "name": "复制",
                          "sequence": 3,
                          "identification": "s2b2c.miniprogram_bottom_navigation.navigation_copy",
                          "identificationName": "s2b2c.miniprogram_bottom_navigation.navigation_copy",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "3b048d45-87d4-4f1f-9760-580fe868d360",
                          "name": "删除",
                          "sequence": 4,
                          "identification": "s2b2c.miniprogram_bottom_navigation.navigation_delete",
                          "identificationName": "s2b2c.miniprogram_bottom_navigation.navigation_delete",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "b3c187b0-5345-48c6-b882-c8371be5ffe7",
                  "name": "个人中心",
                  "sequence": 5,
                  "permissions": [
                      {
                          "id": "83def5db-e39e-489b-b77e-106737d2e395",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "s2b2c.miniprogram_personal_center.personal_center_view",
                          "identificationName": "s2b2c.miniprogram_personal_center.personal_center_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "05e62265-3edc-439e-aaa6-fbe4d1ce668b",
                          "name": "新增",
                          "sequence": 1,
                          "identification": "s2b2c.miniprogram_personal_center.personal_center_create",
                          "identificationName": "s2b2c.miniprogram_personal_center.personal_center_create",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "85e31d70-21f0-445a-9704-130ab85465d0",
                          "name": "编辑",
                          "sequence": 2,
                          "identification": "s2b2c.miniprogram_personal_center.personal_center_edit",
                          "identificationName": "s2b2c.miniprogram_personal_center.personal_center_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "9d375da0-414a-4b1c-8bd2-a368e719377f",
                          "name": "复制",
                          "sequence": 3,
                          "identification": "s2b2c.miniprogram_personal_center.personal_center_copy",
                          "identificationName": "s2b2c.miniprogram_personal_center.personal_center_copy",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "cc530451-67f4-4acc-bc5a-164713d6415d",
                          "name": "删除",
                          "sequence": 4,
                          "identification": "s2b2c.miniprogram_personal_center.personal_center_delete",
                          "identificationName": "s2b2c.miniprogram_personal_center.personal_center_delete",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "63d01e0e-3140-4bf1-840a-34eb34912279",
                  "name": "扫码点餐页",
                  "sequence": 6,
                  "permissions": [
                      {
                          "id": "71968c76-1d92-4f43-b6cc-372f3788598e",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "s2b2c.miniprogram_scan_order_page.scan_order_page_view",
                          "identificationName": "s2b2c.miniprogram_scan_order_page.scan_order_page_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "e230eed1-a43d-4bf0-a58c-a2df251d4fb5",
                          "name": "编辑",
                          "sequence": 1,
                          "identification": "s2b2c.miniprogram_scan_order_page.scan_order_page_edit",
                          "identificationName": "s2b2c.miniprogram_scan_order_page.scan_order_page_edit",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "3f0b870f-bb49-4624-aa9e-05d4bc7c6799",
                  "name": "自定义页面",
                  "sequence": 7,
                  "permissions": [
                      {
                          "id": "9e1b15cc-58b3-4dec-8793-df37773c4e7b",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "s2b2c.miniprogram_custom_page.custom_page_view",
                          "identificationName": "s2b2c.miniprogram_custom_page.custom_page_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "a3d01e29-bd0c-4131-846f-c7522d4bcd94",
                          "name": "新增",
                          "sequence": 1,
                          "identification": "s2b2c.miniprogram_custom_page.custom_page_create",
                          "identificationName": "s2b2c.miniprogram_custom_page.custom_page_create",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "e7d20fc8-6347-409e-a227-7b0ccd92ecb6",
                          "name": "编辑",
                          "sequence": 2,
                          "identification": "s2b2c.miniprogram_custom_page.custom_page_edit",
                          "identificationName": "s2b2c.miniprogram_custom_page.custom_page_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "036902ae-2d4c-4de2-838b-548fb1f5bcc2",
                          "name": "复制",
                          "sequence": 3,
                          "identification": "s2b2c.miniprogram_custom_page.custom_page_copy",
                          "identificationName": "s2b2c.miniprogram_custom_page.custom_page_copy",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "bdcb1d61-b8ae-4ab8-9be3-d90e114f405b",
                          "name": "删除",
                          "sequence": 4,
                          "identification": "s2b2c.miniprogram_custom_page.custom_page_delete",
                          "identificationName": "s2b2c.miniprogram_custom_page.custom_page_delete",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              }
          ]
      },
      {
          "id": "c8ac0dab-c157-41c9-870b-bf6aa1dd02df",
          "name": "H5/APP装修",
          "sequence": 9,
          "functions": [
              {
                  "id": "9f97cd15-3775-450a-a830-fb2e2195fe0e",
                  "name": "商城模板",
                  "sequence": 0,
                  "permissions": [
                      {
                          "id": "a7963876-2f44-4544-9950-557ed3598199",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "s2b2c.h5app_mall_template.template_view",
                          "identificationName": "s2b2c.h5app_mall_template.template_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "ec848374-e2be-4191-9a61-3953a6dc57fc",
                          "name": "新增",
                          "sequence": 1,
                          "identification": "s2b2c.h5app_mall_template.template_create",
                          "identificationName": "s2b2c.h5app_mall_template.template_create",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "0330df86-83f9-4017-9aef-c26b2ba90858",
                          "name": "编辑",
                          "sequence": 2,
                          "identification": "s2b2c.h5app_mall_template.template_edit",
                          "identificationName": "s2b2c.h5app_mall_template.template_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "48be887f-109f-4594-9f01-71bcf10b9717",
                          "name": "复制",
                          "sequence": 3,
                          "identification": "s2b2c.h5app_mall_template.template_copy",
                          "identificationName": "s2b2c.h5app_mall_template.template_copy",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "04d95473-6014-4177-b392-211f7c8facbe",
                          "name": "删除",
                          "sequence": 4,
                          "identification": "s2b2c.h5app_mall_template.template_delete",
                          "identificationName": "s2b2c.h5app_mall_template.template_delete",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "f972fa1f-259d-4984-9ece-c0cd2fee3e59",
                  "name": "商城首页-推荐",
                  "sequence": 1,
                  "permissions": [
                      {
                          "id": "40dbfb46-b7d3-45e4-9515-4de13e244677",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "s2b2c.h5app_mall_home_recommend.home_view",
                          "identificationName": "s2b2c.h5app_mall_home_recommend.home_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "310653ae-0190-4c54-8522-813212c33035",
                          "name": "新增",
                          "sequence": 1,
                          "identification": "s2b2c.h5app_mall_home_recommend.home_create",
                          "identificationName": "s2b2c.h5app_mall_home_recommend.home_create",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "ba605f35-371f-42a3-9db6-a6a87a0f8644",
                          "name": "编辑",
                          "sequence": 2,
                          "identification": "s2b2c.h5app_mall_home_recommend.home_edit",
                          "identificationName": "s2b2c.h5app_mall_home_recommend.home_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "a250f49b-2e21-4c73-97a1-a7eb0f98b885",
                          "name": "复制",
                          "sequence": 3,
                          "identification": "s2b2c.h5app_mall_home_recommend.home_copy",
                          "identificationName": "s2b2c.h5app_mall_home_recommend.home_copy",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "f555126c-dea1-4a42-b154-ddce4e5c16fa",
                          "name": "删除",
                          "sequence": 4,
                          "identification": "s2b2c.h5app_mall_home_recommend.home_delete",
                          "identificationName": "s2b2c.h5app_mall_home_recommend.home_delete",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "30d6837f-3657-47b3-a950-90011d845bbb",
                  "name": "商城首页-同城",
                  "sequence": 2,
                  "permissions": [
                      {
                          "id": "33e24157-d438-4441-8604-c46d3f6cbe4c",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "s2b2c.h5app_mall_home_same_city.home_view",
                          "identificationName": "s2b2c.h5app_mall_home_same_city.home_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "b6840fed-d61c-4094-8960-76be42b3559f",
                          "name": "新增",
                          "sequence": 1,
                          "identification": "s2b2c.h5app_mall_home_same_city.home_create",
                          "identificationName": "s2b2c.h5app_mall_home_same_city.home_create",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "a06a5c09-ad4a-4d70-85db-114f5c1fad2a",
                          "name": "编辑",
                          "sequence": 2,
                          "identification": "s2b2c.h5app_mall_home_same_city.home_edit",
                          "identificationName": "s2b2c.h5app_mall_home_same_city.home_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "5c45d174-4fa2-4b53-bd04-640e2058ebf2",
                          "name": "复制",
                          "sequence": 3,
                          "identification": "s2b2c.h5app_mall_home_same_city.home_copy",
                          "identificationName": "s2b2c.h5app_mall_home_same_city.home_copy",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "180ce59d-7199-4db1-b2a2-c5c8d01b010d",
                          "name": "删除",
                          "sequence": 4,
                          "identification": "s2b2c.h5app_mall_home_same_city.home_delete",
                          "identificationName": "s2b2c.h5app_mall_home_same_city.home_delete",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "86958a6d-1a4b-47ab-8f2e-3c30c7be42cc",
                  "name": "商品分类",
                  "sequence": 3,
                  "permissions": [
                      {
                          "id": "e04eca14-b9b7-4772-a74d-bcf028f20de8",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "s2b2c.h5app_product_category.category_view",
                          "identificationName": "s2b2c.h5app_product_category.category_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "1ffb003a-2614-4e48-832b-1fd16e38ed9c",
                          "name": "新增",
                          "sequence": 1,
                          "identification": "s2b2c.h5app_product_category.category_create",
                          "identificationName": "s2b2c.h5app_product_category.category_create",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "f78c4a0c-42ab-47d0-9903-e110f89be489",
                          "name": "编辑",
                          "sequence": 2,
                          "identification": "s2b2c.h5app_product_category.category_edit",
                          "identificationName": "s2b2c.h5app_product_category.category_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "19da708b-c166-4d88-a87e-831134f64883",
                          "name": "复制",
                          "sequence": 3,
                          "identification": "s2b2c.h5app_product_category.category_copy",
                          "identificationName": "s2b2c.h5app_product_category.category_copy",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "726088f7-ab06-422e-8b79-328f81df4264",
                          "name": "删除",
                          "sequence": 4,
                          "identification": "s2b2c.h5app_product_category.category_delete",
                          "identificationName": "s2b2c.h5app_product_category.category_delete",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "b4fc7c91-de02-454b-849d-7018715ef251",
                  "name": "底部导航",
                  "sequence": 4,
                  "permissions": [
                      {
                          "id": "92f8ed18-6881-4a5e-8805-afd9123dc7a3",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "s2b2c.h5app_bottom_navigation.navigation_view",
                          "identificationName": "s2b2c.h5app_bottom_navigation.navigation_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "7edf0332-af11-4358-a512-24e492936ee2",
                          "name": "新增",
                          "sequence": 1,
                          "identification": "s2b2c.h5app_bottom_navigation.navigation_create",
                          "identificationName": "s2b2c.h5app_bottom_navigation.navigation_create",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "ba87ed73-362c-4493-af0a-49bf50dfd725",
                          "name": "编辑",
                          "sequence": 2,
                          "identification": "s2b2c.h5app_bottom_navigation.navigation_edit",
                          "identificationName": "s2b2c.h5app_bottom_navigation.navigation_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "53cf4c1d-6046-472d-bce2-d236520e6bdd",
                          "name": "复制",
                          "sequence": 3,
                          "identification": "s2b2c.h5app_bottom_navigation.navigation_copy",
                          "identificationName": "s2b2c.h5app_bottom_navigation.navigation_copy",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "9104d9f3-4114-4a39-a845-a99ff694abd4",
                          "name": "删除",
                          "sequence": 4,
                          "identification": "s2b2c.h5app_bottom_navigation.navigation_delete",
                          "identificationName": "s2b2c.h5app_bottom_navigation.navigation_delete",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "6c9a4cc4-249b-4d25-a903-6b43c829bbbe",
                  "name": "个人中心",
                  "sequence": 5,
                  "permissions": [
                      {
                          "id": "acb80889-3a05-4141-8c1d-7ca9a6ac30f5",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "s2b2c.h5app_personal_center.personal_center_view",
                          "identificationName": "s2b2c.h5app_personal_center.personal_center_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "b520430c-a00d-4b80-9a0f-a0fb65de6eba",
                          "name": "新增",
                          "sequence": 1,
                          "identification": "s2b2c.h5app_personal_center.personal_center_create",
                          "identificationName": "s2b2c.h5app_personal_center.personal_center_create",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "7cc1c6aa-9e39-4ad6-a2ee-1e239ebdd227",
                          "name": "编辑",
                          "sequence": 2,
                          "identification": "s2b2c.h5app_personal_center.personal_center_edit",
                          "identificationName": "s2b2c.h5app_personal_center.personal_center_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "a0720475-69d2-4168-bf9a-30db255ef549",
                          "name": "复制",
                          "sequence": 3,
                          "identification": "s2b2c.h5app_personal_center.personal_center_copy",
                          "identificationName": "s2b2c.h5app_personal_center.personal_center_copy",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "a943748b-42d8-45f9-9d59-23335a0c46dc",
                          "name": "删除",
                          "sequence": 4,
                          "identification": "s2b2c.h5app_personal_center.personal_center_delete",
                          "identificationName": "s2b2c.h5app_personal_center.personal_center_delete",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "f82d3bc0-ac23-4e60-bc2c-0e7157f75cb1",
                  "name": "自定义页面",
                  "sequence": 6,
                  "permissions": [
                      {
                          "id": "94a094ea-25c8-4496-ae0b-29b6a65beb44",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "s2b2c.h5app_custom_page.custom_page_view",
                          "identificationName": "s2b2c.h5app_custom_page.custom_page_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "391a0d45-f5b4-4a1d-93c2-6d09075c1f88",
                          "name": "新增",
                          "sequence": 1,
                          "identification": "s2b2c.h5app_custom_page.custom_page_create",
                          "identificationName": "s2b2c.h5app_custom_page.custom_page_create",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "02bd72c1-ecef-4310-b91e-245de9a277f7",
                          "name": "编辑",
                          "sequence": 2,
                          "identification": "s2b2c.h5app_custom_page.custom_page_edit",
                          "identificationName": "s2b2c.h5app_custom_page.custom_page_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "af09da79-a8ef-4313-b332-13d282d41fce",
                          "name": "复制",
                          "sequence": 3,
                          "identification": "s2b2c.h5app_custom_page.custom_page_copy",
                          "identificationName": "s2b2c.h5app_custom_page.custom_page_copy",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "78a603c2-ce8a-4958-80fd-1176f3d77b60",
                          "name": "删除",
                          "sequence": 4,
                          "identification": "s2b2c.h5app_custom_page.custom_page_delete",
                          "identificationName": "s2b2c.h5app_custom_page.custom_page_delete",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              }
          ]
      },
      {
          "id": "5f68e27a-a134-42d1-b91d-d1f29ce7bdf2",
          "name": "PC装修",
          "sequence": 10,
          "functions": [
              {
                  "id": "fb024783-e23b-4446-98f9-21a935bad3d4",
                  "name": "PC装修",
                  "sequence": 0,
                  "permissions": [
                      {
                          "id": "6b790551-6a36-42b9-8077-d523c6fba15f",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "s2b2c.pc_decoration.pc_decoration_view",
                          "identificationName": "s2b2c.pc_decoration.pc_decoration_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "5f9f366d-bb63-4924-9e15-0664d69c268a",
                          "name": "编辑",
                          "sequence": 1,
                          "identification": "s2b2c.pc_decoration.pc_decoration_edit",
                          "identificationName": "s2b2c.pc_decoration.pc_decoration_edit",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              }
          ]
      },
      {
          "id": "c0e27142-ea2b-4517-ac7f-cb143836ad09",
          "name": "授权管理",
          "sequence": 11,
          "functions": [
              {
                  "id": "4591ea4b-9afb-4e78-9df4-c5d64fe0125d",
                  "name": "微信小程序",
                  "sequence": 0,
                  "permissions": [
                      {
                          "id": "79de5a74-2993-4269-9f39-b843c85de4a0",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "s2b2c.auth_wechat_miniprogram.miniprogram_view",
                          "identificationName": "s2b2c.auth_wechat_miniprogram.miniprogram_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "921b7ed6-9c0c-47a9-bc88-86eb5e5414a3",
                          "name": "编辑",
                          "sequence": 1,
                          "identification": "s2b2c.auth_wechat_miniprogram.miniprogram_edit",
                          "identificationName": "s2b2c.auth_wechat_miniprogram.miniprogram_edit",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "4a05b601-5aed-4f1d-a721-c2b21cfacdf5",
                  "name": "支付宝小程序",
                  "sequence": 1,
                  "permissions": [
                      {
                          "id": "eb872e26-edf9-4e90-945e-09537b8ebbb7",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "s2b2c.auth_alipay_miniprogram.alipay_miniprogram_view",
                          "identificationName": "s2b2c.auth_alipay_miniprogram.alipay_miniprogram_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "e97ebfa2-20bd-40fd-9bce-d40b78d8d85e",
                          "name": "立即绑定",
                          "sequence": 1,
                          "identification": "s2b2c.auth_alipay_miniprogram.alipay_miniprogram_bind",
                          "identificationName": "s2b2c.auth_alipay_miniprogram.alipay_miniprogram_bind",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              }
          ]
      },
      {
          "id": "ed2c47a3-fe46-49c2-8a12-8435f1b69bee",
          "name": "微信支付",
          "sequence": 12,
          "functions": [
              {
                  "id": "7b4786e9-cac6-4fd4-ae88-4cadcdbef492",
                  "name": "微信直连",
                  "sequence": 0,
                  "permissions": [
                      {
                          "id": "813e306f-d347-4247-825b-a7e1a875e3c4",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "s2b2c.wechat_pay_direct.direct_pay_view",
                          "identificationName": "s2b2c.wechat_pay_direct.direct_pay_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "95f7c9be-11fb-467b-9570-1500db009d94",
                          "name": "添加账号",
                          "sequence": 1,
                          "identification": "s2b2c.wechat_pay_direct.direct_pay_account_add",
                          "identificationName": "s2b2c.wechat_pay_direct.direct_pay_account_add",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "a9911946-af79-43c1-a083-5fbe72f6a631",
                          "name": "编辑",
                          "sequence": 2,
                          "identification": "s2b2c.wechat_pay_direct.direct_pay_account_edit",
                          "identificationName": "s2b2c.wechat_pay_direct.direct_pay_account_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "7ddfc238-24f4-4978-ac6e-a48c427a7c16",
                          "name": "删除",
                          "sequence": 3,
                          "identification": "s2b2c.wechat_pay_direct.direct_pay_account_delete",
                          "identificationName": "s2b2c.wechat_pay_direct.direct_pay_account_delete",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "c60c0c88-3612-410c-9d41-493190bdb539",
                  "name": "聚合支付",
                  "sequence": 1,
                  "permissions": [
                      {
                          "id": "fadafe40-00c1-40af-ae5b-b93aec0215af",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "s2b2c.wechat_pay_aggregate.aggregate_pay_view",
                          "identificationName": "s2b2c.wechat_pay_aggregate.aggregate_pay_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "8807b8c2-7acb-437b-b762-66f0e7abd6a8",
                          "name": "添加账号",
                          "sequence": 1,
                          "identification": "s2b2c.wechat_pay_aggregate.aggregate_pay_account_add",
                          "identificationName": "s2b2c.wechat_pay_aggregate.aggregate_pay_account_add",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "82cf527b-8879-4629-a960-7966ede31735",
                          "name": "编辑",
                          "sequence": 2,
                          "identification": "s2b2c.wechat_pay_aggregate.aggregate_pay_account_edit",
                          "identificationName": "s2b2c.wechat_pay_aggregate.aggregate_pay_account_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "7e20cada-0394-45f2-ac2d-54031e66c3ce",
                          "name": "删除",
                          "sequence": 3,
                          "identification": "s2b2c.wechat_pay_aggregate.aggregate_pay_account_delete",
                          "identificationName": "s2b2c.wechat_pay_aggregate.aggregate_pay_account_delete",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              }
          ]
      },
      {
          "id": "6752222b-25db-44eb-8759-e33370aabec3",
          "name": "支付宝支付",
          "sequence": 13,
          "functions": [
              {
                  "id": "7d10a14b-62c1-44d0-9cd7-6e2a40a0d178",
                  "name": "支付宝支付",
                  "sequence": 0,
                  "permissions": [
                      {
                          "id": "0d4a429c-c00b-40ca-a757-cfe19b6baf6d",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "s2b2c.alipay_pay.alipay_pay_view",
                          "identificationName": "s2b2c.alipay_pay.alipay_pay_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "0506a10b-a6f7-458e-b829-fdd6cca140da",
                          "name": "添加账号",
                          "sequence": 1,
                          "identification": "s2b2c.alipay_pay.alipay_pay_account_add",
                          "identificationName": "s2b2c.alipay_pay.alipay_pay_account_add",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "d2d153d7-42c0-45ca-a432-9f0e9374f7f8",
                          "name": "编辑",
                          "sequence": 2,
                          "identification": "s2b2c.alipay_pay.alipay_pay_account_edit",
                          "identificationName": "s2b2c.alipay_pay.alipay_pay_account_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "6c73201c-bc49-4c14-80e2-caac1f06915d",
                          "name": "删除",
                          "sequence": 3,
                          "identification": "s2b2c.alipay_pay.alipay_pay_account_delete",
                          "identificationName": "s2b2c.alipay_pay.alipay_pay_account_delete",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              }
          ]
      },
      {
          "id": "367e311a-8849-4d49-a114-bae593e138a0",
          "name": "营销中心",
          "sequence": 14,
          "functions": [
              {
                  "id": "b959fad5-1eb9-4038-a6d4-3cdc3f41e682",
                  "name": "会员结算台",
                  "sequence": 0,
                  "permissions": [
                      {
                          "id": "ef7ee66b-c134-45b9-87b5-f6c4bcb07001",
                          "name": "查看会员结算台",
                          "sequence": 0,
                          "identification": "member.settlement.rule_page",
                          "identificationName": "member.settlement.rule_page",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "4149f4f3-27db-4cde-9008-15fc66fc788e",
                          "name": "新建结算规则",
                          "sequence": 1,
                          "identification": "member.settlement.add_rule",
                          "identificationName": "member.settlement.add_rule",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "8a86bca6-f055-4f28-87dc-2a39c175c983",
                          "name": "查看规则详情",
                          "sequence": 2,
                          "identification": "member.settlement.rule_detail",
                          "identificationName": "member.settlement.rule_detail",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "c255e656-8540-4687-a09c-31d158849a8c",
                          "name": "编辑",
                          "sequence": 3,
                          "identification": "member.settlement.update_rule",
                          "identificationName": "member.settlement.update_rule",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "414d64f6-6096-4daa-8074-553bfdb0d926",
                          "name": "复制规则",
                          "sequence": 4,
                          "identification": "member.settlement.copy_rule",
                          "identificationName": "member.settlement.copy_rule",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "afe63a57-ef59-424a-a272-227b8afb66e0",
                          "name": "删除",
                          "sequence": 5,
                          "identification": "member.settlement.delete_rule",
                          "identificationName": "member.settlement.delete_rule",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "e168eab0-0a62-4030-ad92-4bd693c34c4f",
                  "name": "补贴活动管理",
                  "sequence": 1,
                  "permissions": [
                      {
                          "id": "9cd2bfd5-b709-478a-b619-8c598e9d08c0",
                          "name": "查看补贴活动",
                          "sequence": 0,
                          "identification": "member.subsidy_activity.list",
                          "identificationName": "member.subsidy_activity.list",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "785b3868-2adb-439e-b8d0-90c8d0142d93",
                          "name": "新建补贴活动",
                          "sequence": 1,
                          "identification": "member.subsidy_activity.add",
                          "identificationName": "member.subsidy_activity.add",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "e738bdaf-38a8-4137-8e02-06d980bab4e2",
                          "name": "查看补贴活动详情",
                          "sequence": 2,
                          "identification": "member.subsidy_activity.detail",
                          "identificationName": "member.subsidy_activity.detail",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "ee8a0f7e-be4c-4b61-a117-0f7a55f8c33f",
                          "name": "编辑",
                          "sequence": 3,
                          "identification": "member.subsidy_activity.update",
                          "identificationName": "member.subsidy_activity.update",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "12f70882-8345-4fbe-84d4-253ff0d72da8",
                          "name": "删除",
                          "sequence": 4,
                          "identification": "member.subsidy_activity.delete",
                          "identificationName": "member.subsidy_activity.delete",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "ff57f37f-b880-4928-bd30-8cd108d50e6f",
                          "name": "停止",
                          "sequence": 5,
                          "identification": "member.subsidy_activity.stop",
                          "identificationName": "member.subsidy_activity.stop",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "1c7dcc3d-2f52-4d3c-9c48-9ca81d759c9f",
                          "name": "恢复发放",
                          "sequence": 6,
                          "identification": "member.subsidy_activity.start",
                          "identificationName": "member.subsidy_activity.start",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "833c90db-befb-48b8-b8df-a0d7b8dc1d87",
                          "name": "查看补贴记录",
                          "sequence": 7,
                          "identification": "member.subsidy_activity.record",
                          "identificationName": "member.subsidy_activity.record",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "6067172f-c51f-4de3-a147-2801ac429466",
                          "name": "查看补贴记录",
                          "sequence": 8,
                          "identification": "member.subsidy_activity_record.list",
                          "identificationName": "member.subsidy_activity_record.list",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "106cb4f6-7ce0-4b86-a155-efa9f22cce54",
                          "name": "查看记录明细",
                          "sequence": 9,
                          "identification": "member.subsidy_activity_record.detail",
                          "identificationName": "member.subsidy_activity_record.detail",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "84dbaebf-8b4a-4ba9-a8c1-04b55e2aa093",
                          "name": "补发功能",
                          "sequence": 10,
                          "identification": "member.subsidy_activity_record.bf",
                          "identificationName": "member.subsidy_activity_record.bf",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "5fd9dc19-8922-4f2d-9e89-2a9a073488f2",
                          "name": "导出",
                          "sequence": 11,
                          "identification": "member.subsidy_activity_record.export",
                          "identificationName": "member.subsidy_activity_record.export",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "5a8ba8dd-46bd-4c03-83c6-9aa045a4aad5",
                  "name": "订单评价",
                  "sequence": 2,
                  "permissions": [
                      {
                          "id": "2ceed52a-26fa-4720-863b-bbfb21ecac34",
                          "name": "订单评价列表查看",
                          "sequence": 0,
                          "identification": "member.order_review.list",
                          "identificationName": "member.order_review.list",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "8ba0b82a-7024-410a-90f4-0f278bbc0485",
                          "name": "开启/关闭订单评价",
                          "sequence": 1,
                          "identification": "member.order_rule.switch",
                          "identificationName": "member.order_rule.switch",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "e83b2223-5cee-4588-aa6f-10163a304d00",
                          "name": "查看",
                          "sequence": 2,
                          "identification": "member.order_rule.detail",
                          "identificationName": "member.order_rule.detail",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "3f9fc9a8-182f-4cac-82b8-0b3ab03c2b14",
                          "name": "编辑",
                          "sequence": 3,
                          "identification": "member.order_rule.update",
                          "identificationName": "member.order_rule.update",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "4d7c354c-78d3-4359-ab0d-d0dee82f3510",
                  "name": "投票活动",
                  "sequence": 3,
                  "permissions": [
                      {
                          "id": "60254cf0-abab-4421-9a64-35ba7b5da242",
                          "name": "菜品投票列表查看",
                          "sequence": 0,
                          "identification": "member.voting.list",
                          "identificationName": "member.voting.list",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "2cb51369-be08-4757-bac2-a2e591b925a4",
                          "name": "菜品投票编辑",
                          "sequence": 1,
                          "identification": "member.voting.update",
                          "identificationName": "member.voting.update",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "72fda97e-a1f3-424e-8bd4-30a44e310352",
                          "name": "菜品投票删除",
                          "sequence": 2,
                          "identification": "member.voting.delete",
                          "identificationName": "member.voting.delete",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "1e23b5a5-cc33-4217-8c60-6b0c04e5f12c",
                          "name": "菜品投票暂停",
                          "sequence": 3,
                          "identification": "member.voting.stop",
                          "identificationName": "member.voting.stop",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "32f64d55-7783-424d-8f76-3f0738e332d5",
                          "name": "菜品投票统计",
                          "sequence": 4,
                          "identification": "member.voting.statistics",
                          "identificationName": "member.voting.statistics",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "76de9fd8-bf92-4c31-bd9c-f17cb23f6cd9",
                  "name": "限量抢购",
                  "sequence": 4,
                  "permissions": [
                      {
                          "id": "53fb403a-606d-4d14-ac27-03f2d8bb5dd1",
                          "name": "活动列表",
                          "sequence": 0,
                          "identification": "member.panic_buying.activity.list",
                          "identificationName": "member.panic_buying.activity.list",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "d07fddeb-8654-4ee3-b4c1-ed0439387c54",
                          "name": "新建活动",
                          "sequence": 1,
                          "identification": "member.panic_buying.activity.add",
                          "identificationName": "member.panic_buying.activity.add",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "86b421ff-9d7a-429a-a8f7-78dd84c6b6fb",
                          "name": "发布活动",
                          "sequence": 2,
                          "identification": "member.panic_buying.activity.pub",
                          "identificationName": "member.panic_buying.activity.pub",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "8b3805a6-19cd-48a4-a1eb-150d631ff22d",
                          "name": "暂停活动",
                          "sequence": 3,
                          "identification": "member.panic_buying.activity.stop",
                          "identificationName": "member.panic_buying.activity.stop",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "3b7a727b-a7e7-445d-84a8-d76373e132a6",
                          "name": "启用活动",
                          "sequence": 4,
                          "identification": "member.panic_buying.activity.start",
                          "identificationName": "member.panic_buying.activity.start",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "7a9edcc0-fb93-48b1-9b75-c53f56849bbb",
                          "name": "编辑活动",
                          "sequence": 5,
                          "identification": "member.panic_buying.activity.update",
                          "identificationName": "member.panic_buying.activity.update",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "1f9b4cb6-dcb9-468d-a7db-91fe45ac7f62",
                          "name": "复制活动",
                          "sequence": 6,
                          "identification": "member.panic_buying.activity.copy",
                          "identificationName": "member.panic_buying.activity.copy",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "7965782a-e6cf-4e66-b9c5-576cdc65ae4b",
                          "name": "查看活动详情",
                          "sequence": 7,
                          "identification": "member.panic_buying.activity.detail",
                          "identificationName": "member.panic_buying.activity.detail",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "4890d1b2-9d01-4495-83c2-4a991a313d50",
                          "name": "查看活动统计",
                          "sequence": 8,
                          "identification": "member.panic_buying.activity.statistics",
                          "identificationName": "member.panic_buying.activity.statistics",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "8145cd10-58ae-4544-9fee-f71abe62f68c",
                          "name": "删除活动",
                          "sequence": 9,
                          "identification": "member.panic_buying.activity.delete",
                          "identificationName": "member.panic_buying.activity.delete",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "e1c1d40c-acca-4782-a280-079a012205ec",
                          "name": "导出统计数据",
                          "sequence": 10,
                          "identification": "member.panic_buying.activity.export",
                          "identificationName": "member.panic_buying.activity.export",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "9191e4c7-791a-4a54-8a56-c832d886a6ab",
                  "name": "充值营销",
                  "sequence": 5,
                  "permissions": [
                      {
                          "id": "9e1640c8-d7a4-4c9a-91cd-d6b558af31e3",
                          "name": "活动列表",
                          "sequence": 0,
                          "identification": "member.recharge_activity.list",
                          "identificationName": "member.recharge_activity.list",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "ed6540b1-f64d-443c-a141-f5691c7af45f",
                          "name": "新建活动",
                          "sequence": 1,
                          "identification": "member.recharge_activity.add",
                          "identificationName": "member.recharge_activity.add",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "23a5251d-4b30-4a4c-82db-4863e1929415",
                          "name": "发布活动",
                          "sequence": 2,
                          "identification": "member.recharge_activity.pub",
                          "identificationName": "member.recharge_activity.pub",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "b46ca845-7b3d-4187-9fa3-d8e5c4800a9b",
                          "name": "暂停活动",
                          "sequence": 3,
                          "identification": "member.recharge_activity.stop",
                          "identificationName": "member.recharge_activity.stop",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "defea224-ca81-4871-a95e-e7aeddde75bf",
                          "name": "启用活动",
                          "sequence": 4,
                          "identification": "member.recharge_activity.start",
                          "identificationName": "member.recharge_activity.start",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "b4bdd7df-be05-4384-aae7-6e6701872f50",
                          "name": "编辑活动",
                          "sequence": 5,
                          "identification": "member.recharge_activity.update",
                          "identificationName": "member.recharge_activity.update",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "976f8753-d452-4032-ad9e-3b96b01c6533",
                          "name": "复制活动",
                          "sequence": 6,
                          "identification": "member.recharge_activity.copy",
                          "identificationName": "member.recharge_activity.copy",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "4bbe4444-4a6b-478c-bd22-0a00aa0b711a",
                          "name": "查看活动详情",
                          "sequence": 7,
                          "identification": "member.recharge_activity.detail",
                          "identificationName": "member.recharge_activity.detail",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "f4482e2c-a0f9-407c-b1ba-3d139c6f50f1",
                          "name": "查看活动统计",
                          "sequence": 8,
                          "identification": "member.recharge_activity.statistics",
                          "identificationName": "member.recharge_activity.statistics",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "a4dba816-6c4e-4d18-aa09-b092cbda3946",
                          "name": "删除活动",
                          "sequence": 9,
                          "identification": "member.recharge_activity.delete",
                          "identificationName": "member.recharge_activity.delete",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "007349b2-5bc3-4b6f-bf50-ad55c4e92bc9",
                          "name": "导出统计数据",
                          "sequence": 10,
                          "identification": "member.recharge_activity.export",
                          "identificationName": "member.recharge_activity.export",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "186d050e-fb63-49e5-92b7-5d3a2abdb5bc",
                  "name": "充值支付优惠",
                  "sequence": 6,
                  "permissions": [
                      {
                          "id": "1b64be72-2f91-4dea-be54-ca247fa489aa",
                          "name": "活动列表",
                          "sequence": 0,
                          "identification": "member.recharge_payment_activity.list",
                          "identificationName": "member.recharge_payment_activity.list",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "c68e7b96-a627-438a-b6d7-00016b33f076",
                          "name": "新建活动",
                          "sequence": 1,
                          "identification": "member.recharge_payment_activity.add",
                          "identificationName": "member.recharge_payment_activity.add",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "2407628c-da8b-4004-b2d2-c9868fb94b4c",
                          "name": "发布活动",
                          "sequence": 2,
                          "identification": "member.recharge_payment_activity.pub",
                          "identificationName": "member.recharge_payment_activity.pub",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "5a019927-b752-400c-a5d0-2c34ff37ed85",
                          "name": "暂停活动",
                          "sequence": 3,
                          "identification": "member.recharge_payment_activity.stop",
                          "identificationName": "member.recharge_payment_activity.stop",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "6dee98d3-aedc-45a0-82fa-0c6e28d7ee54",
                          "name": "启用活动",
                          "sequence": 4,
                          "identification": "member.recharge_payment_activity.start",
                          "identificationName": "member.recharge_payment_activity.start",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "e2ed7bbf-41bd-4a8f-a3e0-813fea55d497",
                          "name": "编辑活动",
                          "sequence": 5,
                          "identification": "member.recharge_payment_activity.update",
                          "identificationName": "member.recharge_payment_activity.update",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "79c19971-51b6-4c64-9409-69b47e652e05",
                          "name": "复制活动",
                          "sequence": 6,
                          "identification": "member.recharge_payment_activity.copy",
                          "identificationName": "member.recharge_payment_activity.copy",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "1f6dff79-777c-4bd1-93c4-e7bc266a3f8d",
                          "name": "查看活动详情",
                          "sequence": 7,
                          "identification": "member.recharge_payment_activity.detail",
                          "identificationName": "member.recharge_payment_activity.detail",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "9faac314-bc6d-49b0-9129-ba8d5afcee58",
                          "name": "查看活动统计",
                          "sequence": 8,
                          "identification": "member.recharge_payment_activity.statistics",
                          "identificationName": "member.recharge_payment_activity.statistics",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "11f2873e-2434-4596-b5fa-2b2a1e30ee02",
                          "name": "删除活动",
                          "sequence": 9,
                          "identification": "member.recharge_payment_activity.delete",
                          "identificationName": "member.recharge_payment_activity.delete",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "3cddc339-a5ad-4634-9768-0ca3d6d36033",
                          "name": "导出统计数据",
                          "sequence": 10,
                          "identification": "member.recharge_payment_activity.export",
                          "identificationName": "member.recharge_payment_activity.export",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "fc56ac5e-7eab-4258-89c5-26e156e18d4f",
                  "name": "随行红包",
                  "sequence": 7,
                  "permissions": [
                      {
                          "id": "2237b3e2-ae18-4ca6-9fce-a438ba554f38",
                          "name": "活动列表",
                          "sequence": 0,
                          "identification": "member.redpacket.activity_list",
                          "identificationName": "member.redpacket.activity_list",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "43ee00e1-c2ef-4343-aa5c-52b7f2b5a516",
                          "name": "新建活动",
                          "sequence": 1,
                          "identification": "member.redpacket.activity_create",
                          "identificationName": "member.redpacket.activity_create",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "5530c450-f3bd-4597-be41-da479354de0a",
                          "name": "发布活动",
                          "sequence": 2,
                          "identification": "member.redpacket.activity_publish",
                          "identificationName": "member.redpacket.activity_publish",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "7aa051a5-3ef4-43c6-817a-f76587887e94",
                          "name": "暂停活动",
                          "sequence": 3,
                          "identification": "member.redpacket.activity_pause",
                          "identificationName": "member.redpacket.activity_pause",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "baf3ca60-9c4c-4596-b371-e1a4a573a4a5",
                          "name": "启用活动",
                          "sequence": 4,
                          "identification": "member.redpacket.activity_enable",
                          "identificationName": "member.redpacket.activity_enable",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "4973c0eb-fc6e-4db6-b0b1-44e541e35bf3",
                          "name": "编辑活动",
                          "sequence": 5,
                          "identification": "member.redpacket.activity_edit",
                          "identificationName": "member.redpacket.activity_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "43ac11f9-ea8a-4b9b-9a7d-ee0bfe8517c8",
                          "name": "查看活动详情",
                          "sequence": 6,
                          "identification": "member.redpacket.activity_view",
                          "identificationName": "member.redpacket.activity_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "8c8d665f-2378-4c89-897b-dd9e912a6c14",
                          "name": "试玩游戏",
                          "sequence": 7,
                          "identification": "member.redpacket.activity_demo",
                          "identificationName": "member.redpacket.activity_demo",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "5adaf322-7b55-4992-a1b3-150270b469a0",
                          "name": "查看活动统计",
                          "sequence": 8,
                          "identification": "member.redpacket.activity_stats_view",
                          "identificationName": "member.redpacket.activity_stats_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "4a30b2c9-7e0c-4719-8e5c-a3552aafea2f",
                          "name": "删除活动",
                          "sequence": 9,
                          "identification": "member.redpacket.activity_delete",
                          "identificationName": "member.redpacket.activity_delete",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "fede4944-963c-4d65-8376-856e5dbbae09",
                          "name": "导出统计数据",
                          "sequence": 10,
                          "identification": "member.redpacket.activity_stats_export",
                          "identificationName": "member.redpacket.activity_stats_export",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "8f8565fe-ad3a-4b23-9e6e-632096455629",
                          "name": "查看统计数据详情",
                          "sequence": 11,
                          "identification": "member.redpacket.activity_stats_detail",
                          "identificationName": "member.redpacket.activity_stats_detail",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "baccaae5-3213-4a72-b8d3-268bec4bfe9c",
                  "name": "认证有礼",
                  "sequence": 8,
                  "permissions": [
                      {
                          "id": "fe78d93f-4193-4d1e-ade3-b387f2c7942e",
                          "name": "活动列表",
                          "sequence": 0,
                          "identification": "member.auth_gift.activity_list",
                          "identificationName": "member.auth_gift.activity_list",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "5fa6e205-3972-47cd-8583-6ea118f6272d",
                          "name": "新建活动",
                          "sequence": 1,
                          "identification": "member.auth_gift.activity_create",
                          "identificationName": "member.auth_gift.activity_create",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "92142438-92ef-4387-88ff-6b0077aa5478",
                          "name": "发布活动",
                          "sequence": 2,
                          "identification": "member.auth_gift.activity_publish",
                          "identificationName": "member.auth_gift.activity_publish",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "94afe297-fa48-4b7a-b32b-d34a8ed0245b",
                          "name": "暂停活动",
                          "sequence": 3,
                          "identification": "member.auth_gift.activity_pause",
                          "identificationName": "member.auth_gift.activity_pause",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "da75cf2c-46c0-402c-8f4d-d1a0f24bfb54",
                          "name": "启用活动",
                          "sequence": 4,
                          "identification": "member.auth_gift.activity_enable",
                          "identificationName": "member.auth_gift.activity_enable",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "37b616fa-78ff-459d-a59a-e2b560cacc35",
                          "name": "编辑活动",
                          "sequence": 5,
                          "identification": "member.auth_gift.activity_edit",
                          "identificationName": "member.auth_gift.activity_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "e53c91ff-a6d2-4c15-aef4-afffe201fe83",
                          "name": "查看活动详情",
                          "sequence": 6,
                          "identification": "member.auth_gift.activity_view",
                          "identificationName": "member.auth_gift.activity_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "05be7de9-8b9c-4cb1-ad91-0c8f706a578d",
                          "name": "查看活动统计",
                          "sequence": 7,
                          "identification": "member.auth_gift.activity_stats_view",
                          "identificationName": "member.auth_gift.activity_stats_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "204a31ee-38c3-4ca6-a95a-805834cc29ee",
                          "name": "删除活动",
                          "sequence": 8,
                          "identification": "member.auth_gift.activity_delete",
                          "identificationName": "member.auth_gift.activity_delete",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "51fe5208-feba-48c9-b788-8e8f2b7dabbf",
                          "name": "分享活动",
                          "sequence": 9,
                          "identification": "member.auth_gift.activity_share",
                          "identificationName": "member.auth_gift.activity_share",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "e48c8135-2dd4-4b50-bc0e-5d6349afdf23",
                          "name": "查看申请详情",
                          "sequence": 10,
                          "identification": "member.auth_gift.application_detail_view",
                          "identificationName": "member.auth_gift.application_detail_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "4226a17c-f4a0-4295-af78-5810ddcdeb0b",
                          "name": "审核通过",
                          "sequence": 11,
                          "identification": "member.auth_gift.review_approve",
                          "identificationName": "member.auth_gift.review_approve",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "14f25369-4eb6-42a6-afeb-9b034cee80d9",
                          "name": "审核驳回",
                          "sequence": 12,
                          "identification": "member.auth_gift.review_reject",
                          "identificationName": "member.auth_gift.review_reject",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "ba598047-2697-4034-a3b6-8c3a304a3aba",
                  "name": "优惠券",
                  "sequence": 9,
                  "permissions": [
                      {
                          "id": "141b50cc-9b1b-4939-9642-37bb3b7b2fb5",
                          "name": "优惠券列表",
                          "sequence": 0,
                          "identification": "member.coupon.coupon_list",
                          "identificationName": "member.coupon.coupon_list",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "ee3ba712-5265-4028-80c3-7a49f9bde14a",
                          "name": "立即创建",
                          "sequence": 1,
                          "identification": "member.coupon.coupon_create",
                          "identificationName": "member.coupon.coupon_create",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "359dbec4-4194-49ef-9a7b-8cdfa8ea19ba",
                          "name": "发布",
                          "sequence": 2,
                          "identification": "member.coupon.coupon_publish",
                          "identificationName": "member.coupon.coupon_publish",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "539bf49b-f5b0-498b-9686-b03b72225cf5",
                          "name": "停止发放",
                          "sequence": 3,
                          "identification": "member.coupon.coupon_issue_stop",
                          "identificationName": "member.coupon.coupon_issue_stop",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "2d83795e-5c25-49bb-b972-138e84e32576",
                          "name": "恢复发放",
                          "sequence": 4,
                          "identification": "member.coupon.coupon_issue_resume",
                          "identificationName": "member.coupon.coupon_issue_resume",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "44725e15-4914-48f2-9093-4eca1d40468d",
                          "name": "编辑",
                          "sequence": 5,
                          "identification": "member.coupon.coupon_edit",
                          "identificationName": "member.coupon.coupon_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "84b76720-76b3-4e2e-8d80-f0d0fab46aad",
                          "name": "复制",
                          "sequence": 6,
                          "identification": "member.coupon.coupon_copy",
                          "identificationName": "member.coupon.coupon_copy",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "fa0a135e-0b5f-401b-a2cc-86b4c5b4b158",
                          "name": "删除",
                          "sequence": 7,
                          "identification": "member.coupon.coupon_delete",
                          "identificationName": "member.coupon.coupon_delete",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "bbbfb996-e31c-405c-96cf-c1252aa9b61f",
                          "name": "查看发放统计",
                          "sequence": 8,
                          "identification": "member.coupon_issue_stats.issue_stats_view",
                          "identificationName": "member.coupon_issue_stats.issue_stats_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "6e283c33-8c25-45b6-a44d-374b279a57ea",
                          "name": "导出发放明细",
                          "sequence": 9,
                          "identification": "member.coupon_issue_stats.issue_details_export",
                          "identificationName": "member.coupon_issue_stats.issue_details_export",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "c987e8be-ef1b-493c-9d24-d2ea120c5d89",
                          "name": "标记使用",
                          "sequence": 10,
                          "identification": "member.coupon_issue_stats.issue_mark_used",
                          "identificationName": "member.coupon_issue_stats.issue_mark_used",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "3cd7a021-0fb5-4bc3-afec-cd22f222a70e",
                          "name": "券作废",
                          "sequence": 11,
                          "identification": "member.coupon_issue_stats.coupon_void",
                          "identificationName": "member.coupon_issue_stats.coupon_void",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "7072f65f-14a4-4875-a78b-efdeee6413bb",
                          "name": "查看核销统计",
                          "sequence": 12,
                          "identification": "member.redeem_stats.redeem_stats_view",
                          "identificationName": "member.redeem_stats.redeem_stats_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "2227a923-8c66-4480-b9ac-3c6d610fc0d3",
                          "name": "导出核销明细",
                          "sequence": 13,
                          "identification": "member.redeem_stats.redeem_details_export",
                          "identificationName": "member.redeem_stats.redeem_details_export",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "5efcd290-00a7-446a-9449-8ec6b7bf0144",
                  "name": "发券宝",
                  "sequence": 10,
                  "permissions": [
                      {
                          "id": "5b635d75-f0df-4356-aec4-713e3950a451",
                          "name": "发券宝列表",
                          "sequence": 0,
                          "identification": "member.coupon_issue.issue_list",
                          "identificationName": "member.coupon_issue.issue_list",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "b8c6b78c-455f-4dc1-b6b5-36465a700b43",
                          "name": "立即创建",
                          "sequence": 1,
                          "identification": "member.coupon_issue.issue_create",
                          "identificationName": "member.coupon_issue.issue_create",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "1f315efb-68e2-427e-b2a6-613742b7bd1d",
                          "name": "发布",
                          "sequence": 2,
                          "identification": "member.coupon_issue.issue_publish",
                          "identificationName": "member.coupon_issue.issue_publish",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "c01556cf-e48d-4440-a982-c28c1ae4fabe",
                          "name": "暂停",
                          "sequence": 3,
                          "identification": "member.coupon_issue.issue_pause",
                          "identificationName": "member.coupon_issue.issue_pause",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "3d3c15bf-1e6a-4a4c-b5cd-c1d6e3407ba0",
                          "name": "开启",
                          "sequence": 4,
                          "identification": "member.coupon_issue.issue_enable",
                          "identificationName": "member.coupon_issue.issue_enable",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "f8cb056e-cd0b-4daa-8bfa-f726312c9b00",
                          "name": "编辑",
                          "sequence": 5,
                          "identification": "member.coupon_issue.issue_edit",
                          "identificationName": "member.coupon_issue.issue_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "1e41a1be-26d1-4b5b-bf00-6afde0a1167b",
                          "name": "领券二维码",
                          "sequence": 6,
                          "identification": "member.coupon_issue.issue_qrcode",
                          "identificationName": "member.coupon_issue.issue_qrcode",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "9d4e670e-8920-4a44-89bf-f84d9d99bd19",
                          "name": "复制",
                          "sequence": 7,
                          "identification": "member.coupon_issue.issue_copy",
                          "identificationName": "member.coupon_issue.issue_copy",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "89d26fde-a1b6-4092-ba5a-a098742a74e4",
                          "name": "删除",
                          "sequence": 8,
                          "identification": "member.coupon_issue.issue_delete",
                          "identificationName": "member.coupon_issue.issue_delete",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "e38567ab-4569-41c4-a0ca-ceaaabffd007",
                          "name": "查看发放统计",
                          "sequence": 9,
                          "identification": "member.issue_campaign_stats.issue_stats_view",
                          "identificationName": "member.issue_campaign_stats.issue_stats_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "6fa1d150-d072-46a1-8cd0-df351899c53b",
                          "name": "导出发放明细",
                          "sequence": 10,
                          "identification": "member.issue_campaign_stats.issue_details_export",
                          "identificationName": "member.issue_campaign_stats.issue_details_export",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "e897f67e-35a7-4705-9865-c0b1f59d4a63",
                          "name": "补发功能",
                          "sequence": 11,
                          "identification": "member.issue_campaign_stats.issue_reissue",
                          "identificationName": "member.issue_campaign_stats.issue_reissue",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "9d00bf89-3493-49f5-a6f0-2b5087c1b7e3",
                  "name": "兑换码",
                  "sequence": 11,
                  "permissions": [
                      {
                          "id": "2230beca-8233-477f-80ac-950203891e69",
                          "name": "活动列表",
                          "sequence": 0,
                          "identification": "member.redeem_code.activity_list",
                          "identificationName": "member.redeem_code.activity_list",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "5325c447-1e4a-44d6-a757-90022d79d4e5",
                          "name": "新建活动",
                          "sequence": 1,
                          "identification": "member.redeem_code.activity_create",
                          "identificationName": "member.redeem_code.activity_create",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "2df55179-aae6-4a0f-8aeb-e1abef58a307",
                          "name": "发布活动",
                          "sequence": 2,
                          "identification": "member.redeem_code.activity_publish",
                          "identificationName": "member.redeem_code.activity_publish",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "a1bcba2d-2992-47f6-83ad-e03e268642fb",
                          "name": "暂停活动",
                          "sequence": 3,
                          "identification": "member.redeem_code.activity_pause",
                          "identificationName": "member.redeem_code.activity_pause",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "f06023d4-2fa5-47ef-a77e-379c40e28221",
                          "name": "开启活动",
                          "sequence": 4,
                          "identification": "member.redeem_code.activity_enable",
                          "identificationName": "member.redeem_code.activity_enable",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "b7b8c1d8-ef3d-47e1-964f-535733af42ae",
                          "name": "编辑活动",
                          "sequence": 5,
                          "identification": "member.redeem_code.activity_edit",
                          "identificationName": "member.redeem_code.activity_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "0619e433-0ebc-4255-906b-e59d027fc460",
                          "name": "复制活动",
                          "sequence": 6,
                          "identification": "member.redeem_code.activity_copy",
                          "identificationName": "member.redeem_code.activity_copy",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "f836ea76-01dd-458e-903d-29ed91126e21",
                          "name": "查看活动详情",
                          "sequence": 7,
                          "identification": "member.redeem_code.activity_view",
                          "identificationName": "member.redeem_code.activity_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "c40315fa-144f-4c2f-aa54-665e70337ab9",
                          "name": "删除活动",
                          "sequence": 8,
                          "identification": "member.redeem_code.activity_delete",
                          "identificationName": "member.redeem_code.activity_delete",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "afd68fb4-e939-42df-93de-1aefb63344c7",
                          "name": "码库",
                          "sequence": 9,
                          "identification": "member.redeem_code.code_pool_view",
                          "identificationName": "member.redeem_code.code_pool_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "554d999b-6c7c-4bd0-88c7-0a5fd67fbc2b",
                          "name": "导出码库数据",
                          "sequence": 10,
                          "identification": "member.redeem_code.code_pool_export",
                          "identificationName": "member.redeem_code.code_pool_export",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "7103380a-b59b-4fef-ab8a-1b42825660d8",
                  "name": "消费有礼",
                  "sequence": 12,
                  "permissions": [
                      {
                          "id": "167f0266-5807-4465-9f6a-8f9bf3705293",
                          "name": "活动列表",
                          "sequence": 0,
                          "identification": "member.consume_gift.activity_list",
                          "identificationName": "member.consume_gift.activity_list",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "8e40b772-9a92-4985-a47d-dc3d0e6c52aa",
                          "name": "新建活动",
                          "sequence": 1,
                          "identification": "member.consume_gift.activity_create",
                          "identificationName": "member.consume_gift.activity_create",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "ddcdf06e-2efe-47a5-8939-2e5f8d7dad6b",
                          "name": "发布活动",
                          "sequence": 2,
                          "identification": "member.consume_gift.activity_publish",
                          "identificationName": "member.consume_gift.activity_publish",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "1015495b-0429-41d8-aa70-234d5ecd7c16",
                          "name": "暂停活动",
                          "sequence": 3,
                          "identification": "member.consume_gift.activity_pause",
                          "identificationName": "member.consume_gift.activity_pause",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "424d0970-31a4-4d8b-bcde-4d6d7f1cd84c",
                          "name": "开启活动",
                          "sequence": 4,
                          "identification": "member.consume_gift.activity_enable",
                          "identificationName": "member.consume_gift.activity_enable",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "824898c2-38d8-4a04-ba61-cb32f593afb8",
                          "name": "编辑活动",
                          "sequence": 5,
                          "identification": "member.consume_gift.activity_edit",
                          "identificationName": "member.consume_gift.activity_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "094ed5bc-daf0-4d16-bfa1-4a37061d3f58",
                          "name": "复制活动",
                          "sequence": 6,
                          "identification": "member.consume_gift.activity_copy",
                          "identificationName": "member.consume_gift.activity_copy",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "0a65de45-2667-4317-a8fc-06bd7e7ee951",
                          "name": "查看活动详情",
                          "sequence": 7,
                          "identification": "member.consume_gift.activity_view",
                          "identificationName": "member.consume_gift.activity_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "316d8d67-49df-4e7c-a115-a777da40ea9e",
                          "name": "查看活动订单",
                          "sequence": 8,
                          "identification": "member.consume_gift.activity_orders_view",
                          "identificationName": "member.consume_gift.activity_orders_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "718dfa7b-4c8a-4c87-9b18-df6f617a2171",
                          "name": "删除活动",
                          "sequence": 9,
                          "identification": "member.consume_gift.activity_delete",
                          "identificationName": "member.consume_gift.activity_delete",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "e8e8ec51-cceb-4796-aa7f-de2fc744c976",
                          "name": "导出统计数据",
                          "sequence": 10,
                          "identification": "member.consume_gift.activity_stats_export",
                          "identificationName": "member.consume_gift.activity_stats_export",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "783d160e-80c0-401a-8b03-e77c5feb3783",
                          "name": "补发功能",
                          "sequence": 11,
                          "identification": "member.consume_gift.activity_reissue",
                          "identificationName": "member.consume_gift.activity_reissue",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "c7e51118-2566-4dc9-8a11-95d201a3f920",
                  "name": "限时特价",
                  "sequence": 13,
                  "permissions": [
                      {
                          "id": "0f41eedd-0863-4a1b-8999-57a6ffda1337",
                          "name": "活动列表",
                          "sequence": 0,
                          "identification": "member.limited_time_sale.activity_list",
                          "identificationName": "member.limited_time_sale.activity_list",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "661eed20-a53a-46ff-8c98-15c313bee72b",
                          "name": "新建活动",
                          "sequence": 1,
                          "identification": "member.limited_time_sale.activity_create",
                          "identificationName": "member.limited_time_sale.activity_create",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "650a3dc7-7196-4805-9198-99123b3c29c3",
                          "name": "发布活动",
                          "sequence": 2,
                          "identification": "member.limited_time_sale.activity_publish",
                          "identificationName": "member.limited_time_sale.activity_publish",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "60d58f00-b9bc-4643-b3b3-c9501d1e49c0",
                          "name": "暂停活动",
                          "sequence": 3,
                          "identification": "member.limited_time_sale.activity_pause",
                          "identificationName": "member.limited_time_sale.activity_pause",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "07a1c678-7f60-4d15-903e-c8c056acdc75",
                          "name": "开启活动",
                          "sequence": 4,
                          "identification": "member.limited_time_sale.activity_enable",
                          "identificationName": "member.limited_time_sale.activity_enable",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "96bab86a-0731-4e6b-a871-da5ce6328de8",
                          "name": "编辑活动",
                          "sequence": 5,
                          "identification": "member.limited_time_sale.activity_edit",
                          "identificationName": "member.limited_time_sale.activity_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "811e0e5e-91c2-4b4c-b02a-92516853372e",
                          "name": "复制活动",
                          "sequence": 6,
                          "identification": "member.limited_time_sale.activity_copy",
                          "identificationName": "member.limited_time_sale.activity_copy",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "24001244-39bb-4e56-a643-12d563a30c8d",
                          "name": "查看活动详情",
                          "sequence": 7,
                          "identification": "member.limited_time_sale.activity_view",
                          "identificationName": "member.limited_time_sale.activity_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "b03aae36-ba2a-42ed-8ea1-efee00c8d83d",
                          "name": "删除活动",
                          "sequence": 8,
                          "identification": "member.limited_time_sale.activity_delete",
                          "identificationName": "member.limited_time_sale.activity_delete",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "1f9c9765-2664-465a-909d-e9cb61d91f7a",
                          "name": "查看活动统计",
                          "sequence": 9,
                          "identification": "member.limited_time_sale.activity_stats_view",
                          "identificationName": "member.limited_time_sale.activity_stats_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "058c8552-ddb7-4eeb-9cf2-2d503e1abf7e",
                          "name": "导出统计数据",
                          "sequence": 10,
                          "identification": "member.limited_time_sale.activity_stats_export",
                          "identificationName": "member.limited_time_sale.activity_stats_export",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "8dbdeabd-e27d-41cb-9d6e-8717b17bcd06",
                  "name": "满减满折",
                  "sequence": 14,
                  "permissions": [
                      {
                          "id": "6ca815ff-c9bd-4195-93d4-08c5ce058779",
                          "name": "活动列表",
                          "sequence": 0,
                          "identification": "member.full_reduction.activity_list",
                          "identificationName": "member.full_reduction.activity_list",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "6ee661be-b00f-4f78-877c-609decabcfca",
                          "name": "新建活动",
                          "sequence": 1,
                          "identification": "member.full_reduction.activity_create",
                          "identificationName": "member.full_reduction.activity_create",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "5bf57007-3e14-4c9c-9e8b-29d2fdf1efe1",
                          "name": "发布活动",
                          "sequence": 2,
                          "identification": "member.full_reduction.activity_publish",
                          "identificationName": "member.full_reduction.activity_publish",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "29bb8aa8-9c69-4110-8b52-6c38f6814598",
                          "name": "暂停活动",
                          "sequence": 3,
                          "identification": "member.full_reduction.activity_pause",
                          "identificationName": "member.full_reduction.activity_pause",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "aef6b48f-a9ae-49ba-8b6f-2e9e2228b075",
                          "name": "开启活动",
                          "sequence": 4,
                          "identification": "member.full_reduction.activity_enable",
                          "identificationName": "member.full_reduction.activity_enable",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "a3aac0b3-5341-4d23-92ab-50828b4be4e1",
                          "name": "编辑活动",
                          "sequence": 5,
                          "identification": "member.full_reduction.activity_edit",
                          "identificationName": "member.full_reduction.activity_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "4c1df119-6858-42bc-8941-7c22a1ca665e",
                          "name": "复制活动",
                          "sequence": 6,
                          "identification": "member.full_reduction.activity_copy",
                          "identificationName": "member.full_reduction.activity_copy",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "24667c9d-5492-4b0c-9dc4-278ed5b2cd44",
                          "name": "查看活动详情",
                          "sequence": 7,
                          "identification": "member.full_reduction.activity_view",
                          "identificationName": "member.full_reduction.activity_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "a7e684d2-b17f-4a69-a759-a0f49fd03858",
                          "name": "删除活动",
                          "sequence": 8,
                          "identification": "member.full_reduction.activity_delete",
                          "identificationName": "member.full_reduction.activity_delete",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "3c5ede08-1e79-476b-9e2f-317ccbd6e7bd",
                          "name": "查看活动统计",
                          "sequence": 9,
                          "identification": "member.full_reduction.activity_stats_view",
                          "identificationName": "member.full_reduction.activity_stats_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "4dbf8262-0a21-4185-a6f9-0d5dc8e9ae35",
                          "name": "导出统计数据",
                          "sequence": 10,
                          "identification": "member.full_reduction.activity_stats_export",
                          "identificationName": "member.full_reduction.activity_stats_export",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "a236c8c9-f71d-4f37-8dd9-6894017119b1",
                  "name": "导客单",
                  "sequence": 15,
                  "permissions": [
                      {
                          "id": "3ff3276f-d258-43ad-b973-373c8ff70ce5",
                          "name": "活动列表",
                          "sequence": 0,
                          "identification": "member.customer_lead.activity_list",
                          "identificationName": "member.customer_lead.activity_list",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "f95fd23e-eb2c-410a-87f6-940f06a5d12a",
                          "name": "新建活动",
                          "sequence": 1,
                          "identification": "member.customer_lead.activity_create",
                          "identificationName": "member.customer_lead.activity_create",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "3d22705a-3de4-478b-aeaf-085469029a7b",
                          "name": "发布活动",
                          "sequence": 2,
                          "identification": "member.customer_lead.activity_publish",
                          "identificationName": "member.customer_lead.activity_publish",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "909c27b0-b8a5-4170-84fb-3d205623531b",
                          "name": "暂停活动",
                          "sequence": 3,
                          "identification": "member.customer_lead.activity_pause",
                          "identificationName": "member.customer_lead.activity_pause",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "b8739450-5a40-437e-8252-defd37705128",
                          "name": "开启活动",
                          "sequence": 4,
                          "identification": "member.customer_lead.activity_enable",
                          "identificationName": "member.customer_lead.activity_enable",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "0d2c686f-937c-411e-8c4b-288a9a87c28b",
                          "name": "编辑活动",
                          "sequence": 5,
                          "identification": "member.customer_lead.activity_edit",
                          "identificationName": "member.customer_lead.activity_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "afc36430-894c-4f81-89ec-768a9118675c",
                          "name": "复制活动",
                          "sequence": 6,
                          "identification": "member.customer_lead.activity_copy",
                          "identificationName": "member.customer_lead.activity_copy",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "fa555d5e-8736-427a-b335-84b4a15111c2",
                          "name": "推广",
                          "sequence": 7,
                          "identification": "member.customer_lead.activity_promote",
                          "identificationName": "member.customer_lead.activity_promote",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "d5235593-e21b-4b11-8f40-959154bdb191",
                          "name": "查看活动详情",
                          "sequence": 8,
                          "identification": "member.customer_lead.activity_view",
                          "identificationName": "member.customer_lead.activity_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "6f958153-dff7-4382-9ed7-d23cdc3344c9",
                          "name": "删除活动",
                          "sequence": 9,
                          "identification": "member.customer_lead.activity_delete",
                          "identificationName": "member.customer_lead.activity_delete",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "ee1d00b6-1f69-4e78-a7cb-79a17c56d7c3",
                  "name": "企微配置",
                  "sequence": 16,
                  "permissions": [
                      {
                          "id": "f931c679-53d5-433d-bbde-3026aa6da30d",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "member.work_weixin.config_view",
                          "identificationName": "member.work_weixin.config_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "d0fa424e-5ca7-4b36-872b-b3de4cb21874",
                          "name": "编辑",
                          "sequence": 1,
                          "identification": "member.work_weixin.config_edit",
                          "identificationName": "member.work_weixin.config_edit",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "a71cb354-0a4d-4fcb-882b-4ddcb7784cda",
                  "name": "消息通知",
                  "sequence": 17,
                  "permissions": [
                      {
                          "id": "42a3e6d9-157a-428b-8134-570209029b90",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "member.yx_setting.msg",
                          "identificationName": "member.yx_setting.msg",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "9d46869a-bfa0-44f5-97d3-f69d44b29e95",
                          "name": "编辑",
                          "sequence": 1,
                          "identification": "member.yx_setting.update_msg",
                          "identificationName": "member.yx_setting.update_msg",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "40680637-a974-48c1-95b2-d27053771e3f",
                  "name": "平台公告",
                  "sequence": 18,
                  "permissions": [
                      {
                          "id": "59ea3368-386b-427f-a75c-0535430c4939",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "member.platform_announcement.announcement_view",
                          "identificationName": "member.platform_announcement.announcement_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "ec0d4f16-3c77-43dd-aceb-bb2b8dbd10d2",
                          "name": "新增消息",
                          "sequence": 1,
                          "identification": "member.platform_announcement.announcement_create",
                          "identificationName": "member.platform_announcement.announcement_create",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "26d84c97-3d33-42aa-a1f9-a19cee798bcc",
                          "name": "推送消息",
                          "sequence": 2,
                          "identification": "member.platform_announcement.announcement_push",
                          "identificationName": "member.platform_announcement.announcement_push",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "00739d9c-4ea3-4102-936a-0761d851b7bc",
                          "name": "编辑",
                          "sequence": 3,
                          "identification": "member.platform_announcement.announcement_edit",
                          "identificationName": "member.platform_announcement.announcement_edit",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "92c68b57-e26f-4287-b148-552be2366eff",
                  "name": "平台客服",
                  "sequence": 19,
                  "permissions": [
                      {
                          "id": "9d8749ed-a172-4b12-92ee-ca87f6a71ac9",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "member.platform_customer_service.customer_service_view",
                          "identificationName": "member.platform_customer_service.customer_service_view",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "fdf6abfc-df90-4053-a1ed-63f90f2cab23",
                  "name": "消费返利",
                  "sequence": 20,
                  "permissions": [
                      {
                          "id": "b68f88b1-a2e7-4901-9e66-82b328a1bdd7",
                          "name": "查看消费返利订单",
                          "sequence": 0,
                          "identification": "member.consume_rebate_orders.orders_view",
                          "identificationName": "member.consume_rebate_orders.orders_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "68fe0a11-5ee3-47e5-a8f4-1be4676e50a4",
                          "name": "编辑消费返利设置",
                          "sequence": 1,
                          "identification": "member.consume_rebate_orders_setting.update",
                          "identificationName": "member.consume_rebate_orders_setting.update",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "82d196de-a52b-4b0a-a7ab-43f63bdd9093",
                  "name": "积分商城",
                  "sequence": 21,
                  "permissions": [
                      {
                          "id": "4753c20c-0236-4440-b14c-baa3789d1fb0",
                          "name": "查看积分商品",
                          "sequence": 0,
                          "identification": "member.points_goods.goods_view",
                          "identificationName": "member.points_goods.goods_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "77104a82-55b2-4df3-be4b-6e8c3c31f58f",
                          "name": "新增积分商品",
                          "sequence": 1,
                          "identification": "member.points_goods.goods_create",
                          "identificationName": "member.points_goods.goods_create",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "23851b36-55ca-44e4-9754-0e11d2e2588c",
                          "name": "编辑积分商品",
                          "sequence": 2,
                          "identification": "member.points_goods.goods_edit",
                          "identificationName": "member.points_goods.goods_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "776d6ee8-db1b-4cc7-ac33-fc379d9f460b",
                          "name": "查看积分订单",
                          "sequence": 3,
                          "identification": "member.points_orders.orders_view",
                          "identificationName": "member.points_orders.orders_view",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "4ba9d571-289d-4f16-a933-5b605f728ac0",
                  "name": "分销裂变",
                  "sequence": 22,
                  "permissions": [
                      {
                          "id": "8eeba51a-df8c-4a16-bcd4-1c49a8eb9dea",
                          "name": "查看分销商品",
                          "sequence": 0,
                          "identification": "member.distribution_goods.goods_view",
                          "identificationName": "member.distribution_goods.goods_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "0c029d73-b1d2-4e70-89ab-34e303055a27",
                          "name": "取消分销",
                          "sequence": 1,
                          "identification": "member.distribution_goods.distribution_cancel",
                          "identificationName": "member.distribution_goods.distribution_cancel",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "070d541c-d30d-42f8-8ba9-800658722e56",
                          "name": "查看分销订单",
                          "sequence": 2,
                          "identification": "member.distribution_orders.orders_view",
                          "identificationName": "member.distribution_orders.orders_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "5a162797-5513-47f4-be59-7ceec07a6567",
                          "name": "查看分销商",
                          "sequence": 3,
                          "identification": "member.distributor.distributor_view",
                          "identificationName": "member.distributor.distributor_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "bee836ad-b067-41e1-ba84-30238a754b70",
                          "name": "查看分销设置",
                          "sequence": 4,
                          "identification": "member.distribution_settings.settings_view",
                          "identificationName": "member.distribution_settings.settings_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "0c117a52-b9c1-421b-bda2-76480fffd9f9",
                          "name": "编辑分销设置",
                          "sequence": 5,
                          "identification": "member.distribution_settings.settings_edit",
                          "identificationName": "member.distribution_settings.settings_edit",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "798b0ed9-f317-41be-9458-3dced455cfa2",
                  "name": "店铺满减",
                  "sequence": 23,
                  "permissions": [
                      {
                          "id": "51a2a00b-13d8-4ee5-a43b-cb89821fc51c",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "member.shop_full_reduction.shop_full_reduction_view",
                          "identificationName": "member.shop_full_reduction.shop_full_reduction_view",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "65f16876-f56d-4b8d-b9a1-58af9344bb6f",
                  "name": "限时秒杀",
                  "sequence": 24,
                  "permissions": [
                      {
                          "id": "12528a99-7c7e-4437-820d-21188680f1db",
                          "name": "查看秒杀活动",
                          "sequence": 0,
                          "identification": "member.seckill_activity.seckill_activity_view",
                          "identificationName": "member.seckill_activity.seckill_activity_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "eca248e4-5e33-4216-9993-0dfc33c015f4",
                          "name": "违规下架",
                          "sequence": 1,
                          "identification": "member.seckill_activity.seckill_activity_violation_offline",
                          "identificationName": "member.seckill_activity.seckill_activity_violation_offline",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "db6e4099-80a8-4b34-a2bb-b8f4dd619c32",
                          "name": "查看活动设置",
                          "sequence": 2,
                          "identification": "member.activity_settings.activity_settings_view",
                          "identificationName": "member.activity_settings.activity_settings_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "78acceaf-0bef-4c33-bdb8-92a114ca3195",
                          "name": "编辑活动设置",
                          "sequence": 3,
                          "identification": "member.activity_settings.activity_settings_edit",
                          "identificationName": "member.activity_settings.activity_settings_edit",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "906e1012-590c-4c2b-9e9d-ed106f539e69",
                  "name": "砍价活动",
                  "sequence": 25,
                  "permissions": [
                      {
                          "id": "867f380c-d2a7-4216-a489-aadc5d5d6b75",
                          "name": "查看砍价活动",
                          "sequence": 0,
                          "identification": "member.bargain_activity.bargain_activity_view",
                          "identificationName": "member.bargain_activity.bargain_activity_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "5b95276c-2aef-4e55-9c67-3bfefe8c6c70",
                          "name": "违规下架",
                          "sequence": 1,
                          "identification": "member.bargain_activity.bargain_activity_violation_offline",
                          "identificationName": "member.bargain_activity.bargain_activity_violation_offline",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "376c05b8-14bc-4d50-b145-d44df4f6bd90",
                  "name": "拼团活动",
                  "sequence": 26,
                  "permissions": [
                      {
                          "id": "534e9407-f776-4d96-b080-432127307a15",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "member.group_buy_activity.group_buy_activity_view",
                          "identificationName": "member.group_buy_activity.group_buy_activity_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "4173e651-fb0d-487d-8f70-e9a45240b471",
                          "name": "违规下架",
                          "sequence": 1,
                          "identification": "member.group_buy_activity.group_buy_activity_violation_offline",
                          "identificationName": "member.group_buy_activity.group_buy_activity_violation_offline",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "d086f77a-4e10-4604-bae6-e7bebbeffe59",
                  "name": "店铺优惠券",
                  "sequence": 27,
                  "permissions": [
                      {
                          "id": "aebbab2a-92d0-4cbd-8b2b-fd5cdfcd928c",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "member.shop_coupon.shop_coupon_view",
                          "identificationName": "member.shop_coupon.shop_coupon_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "c3dbf76d-ff94-48a4-8299-b1fd00c408ba",
                          "name": "违规下架",
                          "sequence": 1,
                          "identification": "member.shop_coupon.shop_coupon_violation_offline",
                          "identificationName": "member.shop_coupon.shop_coupon_violation_offline",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "d6087650-23af-4d23-9d43-1279960d4081",
                  "name": "套餐优惠",
                  "sequence": 28,
                  "permissions": [
                      {
                          "id": "f3308a16-dfeb-4a87-8ab0-09a731f3df32",
                          "name": "查看",
                          "sequence": 0,
                          "identification": "member.package_discount.package_discount_view",
                          "identificationName": "member.package_discount.package_discount_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "56deb326-ed8e-4865-b821-31f834d02840",
                          "name": "违规下架",
                          "sequence": 1,
                          "identification": "member.package_discount.package_discount_violation_offline",
                          "identificationName": "member.package_discount.package_discount_violation_offline",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              }
          ]
      },
      {
          "id": "95ce9d60-56da-45fd-95be-79cf89c47279",
          "name": "权益中心",
          "sequence": 15,
          "functions": [
              {
                  "id": "1baa4d43-afe0-4ec3-805f-8604ea55bfe8",
                  "name": "折扣权益",
                  "sequence": 0,
                  "permissions": [
                      {
                          "id": "622e8402-e7eb-493c-87c9-069291246f1c",
                          "name": "查看权益",
                          "sequence": 0,
                          "identification": "member.discount_benefit.benefit_view",
                          "identificationName": "member.discount_benefit.benefit_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "a88b0798-a2fe-42d6-b317-cbe67fbd3761",
                          "name": "新建权益规则",
                          "sequence": 1,
                          "identification": "member.discount_benefit.benefit_rule_create",
                          "identificationName": "member.discount_benefit.benefit_rule_create",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "7d66a1b7-0e0d-47d3-a591-4a90d25782b9",
                          "name": "查看权益详情",
                          "sequence": 2,
                          "identification": "member.discount_benefit.benefit_detail_view",
                          "identificationName": "member.discount_benefit.benefit_detail_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "f2d91f75-cb57-44ef-94b1-fa5db2834195",
                          "name": "启用",
                          "sequence": 3,
                          "identification": "member.discount_benefit.benefit_enable",
                          "identificationName": "member.discount_benefit.benefit_enable",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "8ddb6f93-3580-46f2-bdee-ced8ea88a6e7",
                          "name": "禁用",
                          "sequence": 4,
                          "identification": "member.discount_benefit.benefit_disable",
                          "identificationName": "member.discount_benefit.benefit_disable",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "e253f911-501a-4cda-9345-cc55ac839122",
                          "name": "编辑",
                          "sequence": 5,
                          "identification": "member.discount_benefit.benefit_edit",
                          "identificationName": "member.discount_benefit.benefit_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "42311a2d-7cd8-4e31-8258-3534f4ebd1f9",
                          "name": "删除",
                          "sequence": 6,
                          "identification": "member.discount_benefit.benefit_delete",
                          "identificationName": "member.discount_benefit.benefit_delete",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "d996af19-6066-42cd-835a-ce605653c1bb",
                          "name": "调用详情",
                          "sequence": 7,
                          "identification": "member.discount_benefit.benefit_call_detail",
                          "identificationName": "member.discount_benefit.benefit_call_detail",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "ab36c1f8-e937-4c1c-be62-1a6327f56e0d",
                  "name": "成长值权益",
                  "sequence": 1,
                  "permissions": [
                      {
                          "id": "1085adb5-5248-4ea3-a5c3-76f4d49b329b",
                          "name": "查看权益",
                          "sequence": 0,
                          "identification": "member.growth_value_benefit.benefit_view",
                          "identificationName": "member.growth_value_benefit.benefit_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "e5fe7abf-266c-4f64-b26f-a93bcb39f257",
                          "name": "新建权益规则",
                          "sequence": 1,
                          "identification": "member.growth_value_benefit.benefit_rule_create",
                          "identificationName": "member.growth_value_benefit.benefit_rule_create",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "6dcbdbad-c8dd-4ca9-9a79-e082e7d6d298",
                          "name": "查看权益详情",
                          "sequence": 2,
                          "identification": "member.growth_value_benefit.benefit_detail_view",
                          "identificationName": "member.growth_value_benefit.benefit_detail_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "0e59da0f-d002-4ddb-a4a9-330f1f913deb",
                          "name": "启用",
                          "sequence": 3,
                          "identification": "member.growth_value_benefit.benefit_enable",
                          "identificationName": "member.growth_value_benefit.benefit_enable",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "ece0725a-1ef1-4bcf-bace-11e7486b3a1d",
                          "name": "禁用",
                          "sequence": 4,
                          "identification": "member.growth_value_benefit.benefit_disable",
                          "identificationName": "member.growth_value_benefit.benefit_disable",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "20f2a3cd-11a8-4035-87ac-79c84ab3aa85",
                          "name": "编辑",
                          "sequence": 5,
                          "identification": "member.growth_value_benefit.benefit_edit",
                          "identificationName": "member.growth_value_benefit.benefit_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "d29225f3-de92-4946-93e3-77297d71b3f2",
                          "name": "删除",
                          "sequence": 6,
                          "identification": "member.growth_value_benefit.benefit_delete",
                          "identificationName": "member.growth_value_benefit.benefit_delete",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "bfbbb3a4-8d64-43ac-834f-b2ac5e856969",
                          "name": "调用详情",
                          "sequence": 7,
                          "identification": "member.growth_value_benefit.benefit_call_detail",
                          "identificationName": "member.growth_value_benefit.benefit_call_detail",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "97d4c3a8-dcae-4d1b-941e-473bfeb921f4",
                  "name": "线下权益",
                  "sequence": 2,
                  "permissions": [
                      {
                          "id": "74d5ad41-4dad-4060-8adc-aa5ecd357dbb",
                          "name": "查看权益",
                          "sequence": 0,
                          "identification": "member.offline_benefit.benefit_view",
                          "identificationName": "member.offline_benefit.benefit_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "d9b79dee-759a-419f-adf6-05896054ad0b",
                          "name": "新建权益规则",
                          "sequence": 1,
                          "identification": "member.offline_benefit.benefit_rule_create",
                          "identificationName": "member.offline_benefit.benefit_rule_create",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "6092edd0-0686-4fda-be11-df47912b3ce9",
                          "name": "查看权益详情",
                          "sequence": 2,
                          "identification": "member.offline_benefit.benefit_detail_view",
                          "identificationName": "member.offline_benefit.benefit_detail_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "3190260e-be7c-486a-bfaf-e2c5fcf4dce3",
                          "name": "启用",
                          "sequence": 3,
                          "identification": "member.offline_benefit.benefit_enable",
                          "identificationName": "member.offline_benefit.benefit_enable",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "2d27d9cb-9f14-4c9c-81f4-1324df234403",
                          "name": "禁用",
                          "sequence": 4,
                          "identification": "member.offline_benefit.benefit_disable",
                          "identificationName": "member.offline_benefit.benefit_disable",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "7cf2974d-b62c-4f69-af1a-7fe4c1a7a6d9",
                          "name": "编辑",
                          "sequence": 5,
                          "identification": "member.offline_benefit.benefit_edit",
                          "identificationName": "member.offline_benefit.benefit_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "a37e8e0a-af46-4dad-9d5d-3eb74c3e4e67",
                          "name": "删除",
                          "sequence": 6,
                          "identification": "member.offline_benefit.benefit_delete",
                          "identificationName": "member.offline_benefit.benefit_delete",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "277c588b-45bc-4f80-9a0a-dac411b54e56",
                          "name": "调用详情",
                          "sequence": 7,
                          "identification": "member.offline_benefit.benefit_call_detail",
                          "identificationName": "member.offline_benefit.benefit_call_detail",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "2281339e-bcb5-4ea7-b57f-612183477e23",
                  "name": "积分权益",
                  "sequence": 3,
                  "permissions": [
                      {
                          "id": "cdba7cbc-df6e-48ac-92c5-a21cbb398858",
                          "name": "查看权益",
                          "sequence": 0,
                          "identification": "member.points_benefit.benefit_view",
                          "identificationName": "member.points_benefit.benefit_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "7baafba9-2ae9-4059-b615-28ec4070eca0",
                          "name": "新建权益规则",
                          "sequence": 1,
                          "identification": "member.points_benefit.benefit_rule_create",
                          "identificationName": "member.points_benefit.benefit_rule_create",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "2ee8f77d-386d-48a6-bbb1-5b943daeda6a",
                          "name": "查看权益详情",
                          "sequence": 2,
                          "identification": "member.points_benefit.benefit_detail_view",
                          "identificationName": "member.points_benefit.benefit_detail_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "3e4d4479-a4c3-43ca-8e55-d2201273318f",
                          "name": "启用",
                          "sequence": 3,
                          "identification": "member.points_benefit.benefit_enable",
                          "identificationName": "member.points_benefit.benefit_enable",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "d3d76f18-e1ca-42b6-b214-be4c0c181fcb",
                          "name": "禁用",
                          "sequence": 4,
                          "identification": "member.points_benefit.benefit_disable",
                          "identificationName": "member.points_benefit.benefit_disable",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "dd3e4c01-ba32-477b-8cbf-98352f1d8d2f",
                          "name": "编辑",
                          "sequence": 5,
                          "identification": "member.points_benefit.benefit_edit",
                          "identificationName": "member.points_benefit.benefit_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "7e336ccb-a897-403f-8be3-d5301e9e010d",
                          "name": "删除",
                          "sequence": 6,
                          "identification": "member.points_benefit.benefit_delete",
                          "identificationName": "member.points_benefit.benefit_delete",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "f143f66e-bea5-4370-b092-6474b8ba1636",
                          "name": "调用详情",
                          "sequence": 7,
                          "identification": "member.points_benefit.benefit_call_detail",
                          "identificationName": "member.points_benefit.benefit_call_detail",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "266b3151-0691-4610-a2ec-70f7fded9d86",
                  "name": "新品优先权益",
                  "sequence": 4,
                  "permissions": [
                      {
                          "id": "7fe24fcb-b712-4c3e-829f-9ed2efa62d27",
                          "name": "查看权益",
                          "sequence": 0,
                          "identification": "member.new_product_priority_benefit.benefit_view",
                          "identificationName": "member.new_product_priority_benefit.benefit_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "0558a914-d130-446d-a587-bfb702879abe",
                          "name": "新建权益规则",
                          "sequence": 1,
                          "identification": "member.new_product_priority_benefit.benefit_rule_create",
                          "identificationName": "member.new_product_priority_benefit.benefit_rule_create",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "54c01fb1-abc4-495a-ae12-f680165762ed",
                          "name": "查看权益详情",
                          "sequence": 2,
                          "identification": "member.new_product_priority_benefit.benefit_detail_view",
                          "identificationName": "member.new_product_priority_benefit.benefit_detail_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "2948f9c2-6e77-47c3-bb6c-9634ed417abe",
                          "name": "启用",
                          "sequence": 3,
                          "identification": "member.new_product_priority_benefit.benefit_enable",
                          "identificationName": "member.new_product_priority_benefit.benefit_enable",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "877f9c1f-8fc7-4959-81b8-4102f111ec4d",
                          "name": "禁用",
                          "sequence": 4,
                          "identification": "member.new_product_priority_benefit.benefit_disable",
                          "identificationName": "member.new_product_priority_benefit.benefit_disable",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "08b47296-8342-40de-99fe-9911bc9856fc",
                          "name": "编辑",
                          "sequence": 5,
                          "identification": "member.new_product_priority_benefit.benefit_edit",
                          "identificationName": "member.new_product_priority_benefit.benefit_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "62be992e-ad51-444e-ad07-a75360f55956",
                          "name": "删除",
                          "sequence": 6,
                          "identification": "member.new_product_priority_benefit.benefit_delete",
                          "identificationName": "member.new_product_priority_benefit.benefit_delete",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "02683b08-1216-4bf0-bdcf-5492df44dc83",
                          "name": "调用详情",
                          "sequence": 7,
                          "identification": "member.new_product_priority_benefit.benefit_call_detail",
                          "identificationName": "member.new_product_priority_benefit.benefit_call_detail",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "4f1b0a3f-e88f-4ffb-a473-7f5b8007d40d",
                  "name": "消费项权益",
                  "sequence": 5,
                  "permissions": [
                      {
                          "id": "02593a14-bc28-4bff-8372-df18f0afc868",
                          "name": "查看权益",
                          "sequence": 0,
                          "identification": "member.consumption_item_benefit.benefit_view",
                          "identificationName": "member.consumption_item_benefit.benefit_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "eec3f0c4-d234-45c9-879d-647f74b43eec",
                          "name": "新建权益规则",
                          "sequence": 1,
                          "identification": "member.consumption_item_benefit.benefit_rule_create",
                          "identificationName": "member.consumption_item_benefit.benefit_rule_create",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "e4a5f728-7cca-4e3a-b1e8-e83efb321526",
                          "name": "查看权益详情",
                          "sequence": 2,
                          "identification": "member.consumption_item_benefit.benefit_detail_view",
                          "identificationName": "member.consumption_item_benefit.benefit_detail_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "92b8547c-7d0d-4fae-9028-e7e443319c40",
                          "name": "启用",
                          "sequence": 3,
                          "identification": "member.consumption_item_benefit.benefit_enable",
                          "identificationName": "member.consumption_item_benefit.benefit_enable",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "9ba921bb-c751-4cf5-a7c5-c8e6846164ea",
                          "name": "禁用",
                          "sequence": 4,
                          "identification": "member.consumption_item_benefit.benefit_disable",
                          "identificationName": "member.consumption_item_benefit.benefit_disable",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "6481c400-c5b5-4b5d-b8f0-1f92b004a5b1",
                          "name": "编辑",
                          "sequence": 5,
                          "identification": "member.consumption_item_benefit.benefit_edit",
                          "identificationName": "member.consumption_item_benefit.benefit_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "16e0d051-71fd-4e65-a057-0505819d11cc",
                          "name": "删除",
                          "sequence": 6,
                          "identification": "member.consumption_item_benefit.benefit_delete",
                          "identificationName": "member.consumption_item_benefit.benefit_delete",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "2fc03d59-a0be-4a90-804b-6bc663bb76b1",
                          "name": "调用详情",
                          "sequence": 7,
                          "identification": "member.consumption_item_benefit.benefit_call_detail",
                          "identificationName": "member.consumption_item_benefit.benefit_call_detail",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              },
              {
                  "id": "07a80fed-063d-405b-8c09-a94719a415dc",
                  "name": "商城购物权益",
                  "sequence": 6,
                  "permissions": [
                      {
                          "id": "8ba882e1-868d-476f-b062-fccb4d08d029",
                          "name": "查看权益",
                          "sequence": 0,
                          "identification": "member.mall_shopping_benefit.benefit_view",
                          "identificationName": "member.mall_shopping_benefit.benefit_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "c0cec6a2-307b-423f-b357-5dcd26e841d1",
                          "name": "新建权益规则",
                          "sequence": 1,
                          "identification": "member.mall_shopping_benefit.benefit_rule_create",
                          "identificationName": "member.mall_shopping_benefit.benefit_rule_create",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "6daba723-4d53-4a69-8c55-2556396d13f6",
                          "name": "查看权益详情",
                          "sequence": 2,
                          "identification": "member.mall_shopping_benefit.benefit_detail_view",
                          "identificationName": "member.mall_shopping_benefit.benefit_detail_view",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "b631162f-b2c3-483d-8765-d7d19610b8d8",
                          "name": "启用",
                          "sequence": 3,
                          "identification": "member.mall_shopping_benefit.benefit_enable",
                          "identificationName": "member.mall_shopping_benefit.benefit_enable",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "d2801723-19e3-4310-95a2-7f81d99d9190",
                          "name": "禁用",
                          "sequence": 4,
                          "identification": "member.mall_shopping_benefit.benefit_disable",
                          "identificationName": "member.mall_shopping_benefit.benefit_disable",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "94e42cbb-3720-4c28-bf8c-262fbda1a609",
                          "name": "编辑",
                          "sequence": 5,
                          "identification": "member.mall_shopping_benefit.benefit_edit",
                          "identificationName": "member.mall_shopping_benefit.benefit_edit",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "6eb122c7-f68b-4f75-8fc7-630dc43cd336",
                          "name": "删除",
                          "sequence": 6,
                          "identification": "member.mall_shopping_benefit.benefit_delete",
                          "identificationName": "member.mall_shopping_benefit.benefit_delete",
                          "dataCode": 0,
                          "fields": []
                      },
                      {
                          "id": "ba91d95a-872d-48ee-98f4-5d9c7f0c7d79",
                          "name": "调用详情",
                          "sequence": 7,
                          "identification": "member.mall_shopping_benefit.benefit_call_detail",
                          "identificationName": "member.mall_shopping_benefit.benefit_call_detail",
                          "dataCode": 0,
                          "fields": []
                      }
                  ]
              }
          ]
      }
  ]
}

const convertToTableData = (data: AuthBlock[]) => {
  const tableData: TableDataType[] = [];
  data.forEach(module => {
    module.functions.forEach(func => {
      func.permissions.forEach(permission => {
        tableData.push({
          key: `${module.id}-${func.id}-${permission.id}`,
          module: module.name,
          functionName: func.name,
          permissionName: permission.name,
          permissionSequence: permission.sequence,
          identification: permission.identification,
          dataCode: permission.dataCode,
          moduleId: module.id,
          functionId: func.id,
          permissionId: permission.id
        });
      });
    });
  });
  return tableData;
}

const AuthTable: React.FC = () => {
  // 转换数据为表格格式
  const tableData = convertToTableData(mock.data);

  const columns: ColumnsType<TableDataType> = [
    {
      title: '功能模块',
      dataIndex: 'module',
      key: 'module',
      width: 120,
      render: (text: string, record: TableDataType, index: number) => {
        // 合并相同模块的单元格
        const isFirstInModule = index === 0 || tableData[index - 1].moduleId !== record.moduleId;
        if (!isFirstInModule) {
          return { children: null, props: { rowSpan: 0 } };
        }
        
        const moduleRowCount = tableData.filter(item => item.moduleId === record.moduleId).length;
        return {
          children: <span>{text}</span>,
          props: { rowSpan: moduleRowCount }
        };
      }
    },
    {
      title: '权限类型',
      dataIndex: 'functionName',
      key: 'functionName',
      width: 150,
      render: (text: string, record: TableDataType, index: number) => {
        // 合并相同功能的单元格
        const isFirstInFunction = index === 0 || 
          tableData[index - 1].functionId !== record.functionId ||
          tableData[index - 1].moduleId !== record.moduleId;
        
        if (!isFirstInFunction) {
          return { children: null, props: { rowSpan: 0 } };
        }
        
        const functionRowCount = tableData.filter(item => 
          item.functionId === record.functionId && 
          item.moduleId === record.moduleId
        ).length;
        
        return {
          children: <span>{text}</span>,
          props: { rowSpan: functionRowCount }
        };
      }
    },
    {
      title: '权限',
      dataIndex: 'permissionName',
      key: 'permissionName',
      width: 200,
      render: (text: string) => <Text>{text}</Text>
    },
    {
      title: '接口地址',
      dataIndex: 'permissionSequence',
      key: 'permissionSequence',
      width: 80,
      render: (sequence: number) => <Tag>{sequence}</Tag>
    },
    {
      title: '接口名',
      dataIndex: 'identification',
      key: 'identification',
      width: 200,
      render: (text: string) => <Text code>{text}</Text>
    },
    {
      title: '权限控制字段',
      dataIndex: 'dataCode',
      key: 'dataCode',
      width: 100,
      render: (code: number) => <Tag color="blue">{code}</Tag>
    },{
      title: '数据权限',
      dataIndex: '',
      key: '',
      width: 100,
      render: (code: number) => <Switch />
    }
  ];

  return <Table<TableDataType> bordered columns={columns} dataSource={tableData} pagination={false} size="middle" />;
};

export default AuthTable;
