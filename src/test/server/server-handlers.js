import { rest } from "msw";
import * as listsDB from 'test/data/lists'

const apiUrl = process.env.REACT_APP_API_URL

const handlers = [
    rest.get(`${apiUrl}/lists`, async (req, res, ctx) => {
        
    })
]