import faker from 'faker'

function buildUser(overrides) {
    return {
        id: faker.random.uuid(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        ...overrides
    }
}

function buildList(overrides) {
    return {
        _id: faker.random.uuid(),
        name: faker.lorem.word(),
        color: `#${faker.random.hexaDecimal()}`,
        ...overrides
    }
}

function buildItem(overrides) {
    return {
        _id: faker.random.uuid(),
        title: faker.name.jobTitle(),
        jobId: faker.random.uuid(),
        companyName: faker.company.companyName(),
        url: faker.internet.url(),
        location: faker.address.city,
        ...overrides
    }
}

export {buildUser, buildItem, buildList}