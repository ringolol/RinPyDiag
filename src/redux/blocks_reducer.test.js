import blocksReducer, { setBlocks, setFiles, setIsLoaded, setFileName } from "./blocks_reducer";

// Test state
let state = {
    blocks: [],
    files: [],
    isLoaded: false,
    text: ''
};

describe('Actions into blocks_reducer', () => {
    const testArr = [{
        inpN: 0,
        name: "const",
        outpN: 1
    }, {
        inpN: 1,
        name: "integ",
        outpN: 1
    }]

    describe('setBlocks: ', () => {
        const setBlocksAction = () => blocksReducer(state, setBlocks(testArr));

        test('Length of the blocks should increase', () => {
            expect(setBlocksAction().blocks.length).toBeGreaterThan(1);
        })
        test('Blocks should be defined', () => {
            expect(setBlocksAction().blocks[0].name).toBeDefined();
        });
        test('Blocks value should be correct', () => {
            expect(setBlocksAction().blocks[0].name).toBe('const');
        });
    })
    describe('setFiles: ', () => {
        const setFilesAction = () => blocksReducer(state, setFiles(testArr));

        test('Length of the files should increase', () => {
            expect(setFilesAction().files.length).toBeGreaterThan(1);
        })
        test('Files should be defined', () => {
            expect(setFilesAction().files[0].name).toBeDefined();
        });
        test('Files value should be correct', () => {
            expect(setFilesAction().files[0].name).toBe('const');
        });
    })
    describe('setIsLoaded: ', () => {
        const setIsLoadedAction = (boolean) => blocksReducer(state, setIsLoaded(boolean));

        test('isLoaded should be defined', () => {
            expect(setIsLoadedAction(true).isLoaded).toBeDefined();
        })
        test('isLoaded should be true', () => {
            expect(setIsLoadedAction(true).isLoaded).toBe(true);
        });
        test('isLoaded should be false', () => {
            expect(setIsLoadedAction(false).isLoaded).toBe(false);
        });
    })
    describe('setText: ', () => {
        const setTextAction = (text) => blocksReducer(state, setFileName(text));

        test('Length of the text should increase', () => {
            expect(setTextAction('Hello friend').filename.length).toBeGreaterThan(10);
        });
        test('Text data type should be a "String"', () => {
            expect(typeof setTextAction('That is string').filename).toBe('string');
        });
        test('Text value should be defined', () => {
            expect(setTextAction('React').filename).toBeDefined();
        });
        test('Text value should be correct', () => {
            expect(setTextAction('Hello friend').filename).toBe('Hello friend');
        });
    })

})