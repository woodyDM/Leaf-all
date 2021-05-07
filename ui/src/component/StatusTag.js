import {Tag} from 'antd';

const map = new Map();
map.set("0", { color: "grey", text: "排队中" });
map.set("1", { color: "cyan", text: "运行中" });
map.set("2", { color: "red", text: "失败" });
map.set("3", { color: "green", text: "成功" });

const fn = function (props) {
   
    const tag = map.get(props.status+"");
    if (tag) {
        return <Tag color={tag.color}>{tag.text}</Tag>
    } else {
        return <div>No status</div>
    }

}

export default fn;