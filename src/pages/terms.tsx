import type { NextPage } from "next";
import Shell from "../components/Shell";
import TermsAndConditions from "../components/TermsAndConditions";

const Terms: NextPage = () => {
  const termsConfig = {
    terms: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis malesuada venenatis ex, sit amet aliquam mauris fringilla ultrices. Integer consectetur vitae neque vitae malesuada. In malesuada arcu sem, a aliquet felis lacinia eu. Sed molestie dolor in blandit feugiat. Aliquam sit amet lorem dapibus, ullamcorper urna volutpat, faucibus quam. Curabitur non eros lacus. Maecenas neque ipsum, euismod in nibh consequat, sodales lobortis dui. Sed eget elit ligula. Nullam hendrerit eget velit id viverra.

Duis eu lacus dui. In posuere leo ut fringilla ornare. Proin a bibendum massa. Maecenas varius dui erat, in ultricies metus pharetra sed. Aenean vulputate id orci at varius. Donec vel volutpat ipsum. Praesent commodo condimentum purus id convallis. Pellentesque fringilla sagittis finibus. Cras volutpat nulla quis odio pharetra condimentum. Praesent pharetra ex at sapien luctus consequat. Donec eu nisi nunc. Cras tincidunt sagittis aliquet. Phasellus eros ante, facilisis sed imperdiet hendrerit, mattis sit amet velit. Suspendisse nec egestas nibh. Cras vehicula augue massa, ut blandit orci blandit eget. Cras aliquet congue quam eget vulputate.

Donec accumsan imperdiet ligula, sit amet volutpat erat dignissim quis. Sed bibendum diam ut nibh tincidunt, pharetra semper leo pellentesque. Etiam lectus quam, ultricies et lectus ut, fermentum vulputate nibh. Morbi sed nulla libero. Fusce eget diam eu tellus eleifend bibendum. In venenatis malesuada diam, vel faucibus ipsum viverra a. Aenean a nibh at nunc vulputate molestie. Ut posuere neque metus, sit amet consequat tellus placerat a. Donec faucibus lacus ac justo sollicitudin, sit amet semper orci dapibus. Nullam ut augue congue, varius leo quis, sodales dolor. Curabitur ac lectus magna. Ut at ante sed elit euismod consectetur nec ac velit.

Etiam vel diam quis mauris convallis commodo et consectetur massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec at diam vel libero dignissim eleifend vitae posuere tellus. Nulla fermentum mauris eget nulla pulvinar accumsan quis ac elit. Pellentesque mi metus, posuere et lorem ut, vulputate condimentum tellus. Curabitur nisl dolor, viverra sit amet faucibus sagittis, interdum nec tortor. Sed nibh augue, condimentum sit amet venenatis vitae, commodo at velit. Mauris magna massa, scelerisque nec sollicitudin pretium, condimentum non erat. Mauris ultrices vel turpis et ullamcorper. Cras viverra dapibus lectus at posuere. Cras consectetur augue sit amet nunc interdum scelerisque. Curabitur a viverra odio.

Praesent semper tortor vitae risus egestas posuere. Sed fermentum, tortor quis finibus pretium, est erat varius est, sed viverra urna metus sed lacus. Nam lorem nulla, ultricies quis luctus non, condimentum convallis metus. In eget sodales lacus. Morbi sollicitudin rhoncus justo eget luctus. Proin ultrices rhoncus nisl quis suscipit. Morbi ornare tortor neque, at laoreet risus lacinia ut.`,
  };
  return (
    <Shell>
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12">
            <TermsAndConditions config={termsConfig} />
          </div>
        </div>
      </div>
    </Shell>
  );
};

export default Terms;
