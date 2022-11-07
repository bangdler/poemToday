import Poem from '../models/poem.js';

export const createFakeData = () => {
  const fakePoems = Array.from({ length: 40 }, (_, i) => ({
    title: `시 #${i}`,
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus efficitur viverra consequat. Quisque ut vehicula urna. Cras ligula tellus, posuere id odio quis, pulvinar tristique lacus. Donec varius sagittis purus sit amet faucibus. Maecenas at fermentum massa, in feugiat sem. Vivamus blandit nibh at tortor mattis, a sollicitudin libero tincidunt. Nulla quam sapien, placerat id ultrices ac, tempus et libero.\n' +
      '\n' +
      'Vivamus sed lectus non elit blandit placerat id at diam. In eu justo lobortis, porta urna non, semper mi. Pellentesque ultricies fringilla mauris non efficitur. Proin blandit sed orci eget mollis. Sed lacinia varius enim, ut bibendum libero malesuada eu. Duis vestibulum eu augue et ultricies. Ut cursus nisl sed fringilla accumsan. Nunc tincidunt egestas turpis, a lacinia risus blandit at. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam malesuada sit amet mi eget mattis. Suspendisse at mauris ac neque laoreet tempor a et lorem.\n' +
      '\n' +
      'Proin tempus velit ac est gravida, eget imperdiet turpis imperdiet. Donec at pulvinar sem. Nulla facilisi. In malesuada elit lectus. Vestibulum pretium, nisi nec auctor consectetur, augue lorem dapibus neque, non viverra eros mauris a felis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus venenatis lacinia placerat. Maecenas massa lacus, imperdiet non augue nec, lacinia fringilla enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam dignissim cursus nulla semper semper. Vestibulum dignissim ut tortor eu laoreet.\n' +
      '\n' +
      'In quis nisl nec felis dignissim ultricies a dapibus ante. Vivamus ultrices nunc massa, ac pretium est facilisis id. Nulla a nibh massa. Nulla aliquam diam nec vestibulum gravida. Fusce quam libero, molestie vitae nibh ut, pulvinar vulputate urna. Fusce consequat dui leo, ac rutrum neque posuere vitae. Praesent in tortor sed mauris bibendum venenatis et sit amet tortor. Fusce semper nisl.`,
    author: `시인 #${i}`,
    category: ['fake', 'poem'],
  }));

  Poem.insertMany(fakePoems);
};
