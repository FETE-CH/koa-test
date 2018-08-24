export default class Result {
    private code: number;
    private message: string;
    private data: object;

    public constructor(code = 0, msg = 'OK', data = {}) {
        this.code = code;
        this.message = msg;
        this.data = data;
    }
};
