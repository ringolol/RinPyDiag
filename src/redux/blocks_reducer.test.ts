import { BloksType, FilesType } from "../types/types";
import blocksReducer, { setBlocks, setFiles, setIsLoaded, setFileName, setFile } from "./blocks_reducer";
import jest from 'jest';

// Test state
let state = {
    blocks: [] as Array<BloksType>,
    files: [] as Array<FilesType>,
    isLoaded: false as boolean,
    filename: '' as string
};

describe('Actions into blocks_reducer', () => {
    const blocksArr: Array<BloksType> = [{
        name: 'Hello friend',
        inpN: 1,
        outpN: 0,
        pars: {
            val: 1
        },
        states: {}
    }]
    const file: FilesType = {
        user: 'ringolol',
        name: 'Test file',
        ser: 'token'
    }
    const filesArr: Array<FilesType> = [file]
    
    describe('setBlocks: ', () => {
        const setBlocksAction = () => blocksReducer(state, setBlocks(blocksArr));

        test('Length of the blocks should increase', () => {
            expect(setBlocksAction().blocks.length).toBeGreaterThan(0);
        })
        test('Blocks should be defined', () => {
            expect(setBlocksAction().blocks[0].name).toBeDefined();
        });
        test('Blocks value should be correct', () => {
            expect(setBlocksAction().blocks[0].name).toBe('Hello friend');
        });
    })
    describe('setFiles: ', () => {
        const setFilesAction = () => blocksReducer(state, setFiles(filesArr));

        test('Length of the files should increase', () => {
            expect(setFilesAction().files.length).toBeGreaterThan(0);
        })
        test('Files should be defined', () => {
            expect(setFilesAction().files[0].name).toBeDefined();
        });
        test('Files value should be correct', () => {
            expect(setFilesAction().files[0].name).toBe('Test file');
        });
    })
    describe('setIsLoaded: ', () => {
        const setIsLoadedAction = (boolean: boolean) => blocksReducer(state, setIsLoaded(boolean));

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
    describe('setFileName: ', () => {
        const setTextAction = (filename: string) => blocksReducer(state, setFileName(filename));

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
    describe('setFile: ', () => {
        const setFileAction = () => blocksReducer(state, setFile(file));

        test('Length of the files should increase', () => {
            expect(setFileAction().files.length).toBeGreaterThan(0);
        })
        test('Files should be defined', () => {
            expect(setFileAction().files[0].name).toBeDefined();
        });
        test('Files value should be correct', () => {
            expect(setFileAction().files[0].name).toBe('Test file');
        });
    })
})