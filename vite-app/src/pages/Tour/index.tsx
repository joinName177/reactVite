import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { Button } from "antd";
export default function index() {
  const driverObj = driver({
    showProgress: true,
    allowClose: false,
    popoverClass: "tour-component-popover",
    nextBtnText: "下一步",
    prevBtnText: "上一步",
    doneBtnText: "完成",
    steps: [
      {
        element: "#tour-example1",
        popover: { title: "Animated Tour Example", description: "Here is the code example showing animated tour. Let's walk you through it.", side: "left", align: "start" }
      },
      { element: "#tour-example2", popover: { title: "Import the Library", description: "It works the same in vanilla JavaScript as well as frameworks.", side: "bottom", align: "start" } },
      {
        element: "#tour-example3",
        popover: {
          title: "Importing CSS",
          description: '<img style="width: 200px; height: 100px;" src="https://gips1.baidu.com/it/u=1971954603,2916157720&fm=3028&app=3028&f=JPEG&fmt=auto?w=1920&h=2560"/>',
          side: "bottom",
          align: "start"
        }
      },
      { element: "#tour-example4", popover: { title: "Create Driver", description: "Simply call the driver function to create a driver.js instance", side: "left", align: "start" } },
      { element: "#tour-example5", popover: { title: "Start Tour", description: "Call the drive method to start the tour and your tour will be started.", side: "top", align: "start" } },
      {
        element: "#tour-example6",
        popover: { title: "More Configuration", description: "Look at this page for all the configuration options you can pass.", side: "right", align: "start" }
      },
      { element: "#tour-example7", popover: { title: "Happy Coding", description: "And that is all, go ahead and start adding tours to your applications." } },
      { element: "#tour-example8", popover: { title: "Happy Coding", description: "And that is all, go ahead and start adding tours to your applications." } }
    ]
  });

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Button type="primary" onClick={() => driverObj.drive()}>
        开始
      </Button>
      <Button id="tour-example1" type="primary">
        第一步
      </Button>
      <Button id="tour-example2" type="primary">
        第二步
      </Button>
      <Button id="tour-example3" type="primary">
        第三步
      </Button>
      <Button id="tour-example4" type="primary">
        第四步
      </Button>
      <Button id="tour-example5" type="primary">
        第五步
      </Button>
      <Button id="tour-example6" type="primary">
        第六步
      </Button>
      <Button id="tour-example7" type="primary">
        第七步
      </Button>
      <Button id="tour-example8" type="primary">
        第八步
      </Button>
    </div>
  );
}
