import * as axios from 'axios';
import { blocksAPI, filesAPI } from "./api";

jest.mock('axios');

describe('Ajax GET', () => {
    let response;
    let array;

    beforeEach(() => {
        array = [
            {id: 1, title: 'Block 1', type: 'step', polarity: false}
        ]

        response = {
            data: {
                array
            }
        }
    });


    test('blocksAPI: getBlocks should return data from backend', () => {
        axios.get.mockReturnValue(response);

        return blocksAPI.getBlocks().then(data => {
            expect(data.array).toEqual(array);
        })
    })

    test('filesAPI: getFiles should return data from backend', () => {
        axios.get.mockReturnValue(response);

        return filesAPI.getFiles().then(data => {
            expect(data.array).toEqual(array);
        })
    })
})