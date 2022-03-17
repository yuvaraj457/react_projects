
import ThreeSixty from "react-360-view";

// const basePath = "./assets/images/images-black-1/";
const basePath = "./assets/images/shirts/";

export default function ImageTest() {
  return (
    <div >
      <ThreeSixty
        amount={8}
        imagePath={basePath}
        // fileName="civicsss-{index}.jpg"
        fileName="civic-{index}.jpg"
        spinReverse
      />
    </div>
  );
}