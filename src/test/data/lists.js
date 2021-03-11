const listsKey = '__jobTrack_lists__'
let lists = {}
const persist = () => window.localStorage.setItem(listsKey, JSON.stringify(lists))
const load = () => Object.assign(lists, JSON.parse(window.localStorage.getItem(listsKey)))

try {
    load()
}catch(error){
    persist()
}

window.__jobTrack = window.__jobTrack || {}
window.__jobTrack.purgeLists = () => {
    Object.keys(lists).forEach(key => {
        delete lists[key]
      })
    persist()
}


async function authorize(userId, listId) {
    const list = await read(listId)
    if (list.createdBy !== userId) {
        const error = new Error('User is not authorized to view that list')
        error.status = 403
        throw error
    }
}


async function create({
    name = required('listName'),
    userId = required('userId'),
    color = required('color')
}) {
const id = hash(`${name}${userId}`)
if(lists[id]){
    const error = new Error('the list with this name is already exists')
    error.status = 400
    throw error
}
    lists[id] = {_id: id, name, createdBy: userId, color, createdAt: Date.now()}
    persist()
    return read(id)
}


async function read(id) {
    validateList(id)
    return lists[id]
}

async function remove(id) {
    validateList(id)
    delete lists[id]
    persist()
}

async function readMany(userId) {
    load()
   const listsData = []
    Object.keys(lists).forEach(key => {
       if(lists[key].createdBy === userId) {
           listsData.push(lists[key])
       }
    
    })
    return listsData
}

function validateList(id) {
    load()
    if(!lists[id]){
        const error = new Error(`No list item whith the id "${id}"`)
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
    lists = {}
    persist()
}

export {authorize, create, read, remove, readMany, reset}