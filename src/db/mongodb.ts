import Monk from 'monk';

const mongodbUrl: string = 'localhost:27017/test';

export default Monk(mongodbUrl);
