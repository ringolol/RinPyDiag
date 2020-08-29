import { blocksAPI } from "../api/api";

const GET_BLOCKS = 'blocks/GET_BLOCKS';

let initialState = {
    blocks: []
};

const blocksReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_BLOCKS: {
            return {
                ...state,
                blocks: [...action.blocks]
            }
        }
        default:
            return state;
    }  
}

export const setBlocksData = (blocks) => ({ type: GET_BLOCKS, blocks })

export const getBlocksData = () => async (dispatch) => {
    const response = await blocksAPI.getBlocks();

    dispatch(setBlocksData(response));
    
}

export default blocksReducer;