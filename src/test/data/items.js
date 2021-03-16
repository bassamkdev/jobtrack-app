const itemsKey = '__jobTrack_Items__'
let items = {}
const persist = () => window.localStorage.setItem(itemsKey, JSON.stringify(items))
const load = () => Object.assign(items, JSON.parse(window.localStorage.getItem(itemsKey)))

try {
    load()
}catch(error){
    persist()
}

window.__jobTrack = window.__jobTrack || {}
window.__jobTrack.purgeItems = () => {
    Object.keys(items).forEach(key => {
        delete items[key]
      })
    persist()
}


async function authorize(userId, itemId) {
    const item = await read(itemId)
    if (item.createdBy !== userId) {
        const error = new Error('User is not authorized to view that item')
        error.status = 403
        throw error
    }
}


async function create({
    title = required('itemTitle'),
    userId = required('userId'),
    companyName = required('companyName'),
    companyType = null,
    url = required('url'),
    employmentType = null,
    notes = null,
    list = required('listId'),
    jobId = null,
    location = required('location'),

}) {
const id = hash(`${title}${userId}${companyName}`)
if(items[id]){
    const error = new Error('the item with this name is already exists')
    error.status = 400
    throw error
}
    items[id] = {_id: id, title, jobId, companyName, companyType, url, employmentType, notes, list, location,createdBy: userId,  createdAt: Date.now()}
    persist()
    return read(id)
}


async function read(id) {
    validateItem(id)
    return items[id]
}

async function remove(id) {
    validateItem(id)
    delete items[id]
    persist()
}

async function readMany(userId) {
    load()
   const itemsData = []
    Object.keys(items).forEach(key => {
       if(items[key].createdBy === userId) {
           itemsData.push(items[key])
       }
    
    })
    return itemsData
}

function validateItem(id) {
    load()
    if(!items[id]){
        const error = new Error(`No item item whith the id "${id}"`)
        error.status = 404
        throw error
    }
}


function hash(str) {
    var hash = 5381,
    i= str.length
    while(i) {
        hash = (hash*33) ^ str.charCodeAt(--i)
    }
    return String(hash>>>0)
}

function required(key) {
    const error = new Error(`${key} is required`)
    error.status = 400
    throw error
}

function reset() {
    items = {}
    persist()
}

export {authorize, create, read, remove, readMany, reset}