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
    const item =  {
        title: faker.name.jobTitle(),
        jobId: faker.random.uuid(),
        companyName: faker.company.companyName(),
        companyType: faker.company.companySuffix(),
        employmentType: 'fulltime',
        url: faker.internet.url(),
        location: faker.address.city(),
        notes: faker.lorem.paragraph(),
        ...overrides
    }
    return item
}

function buildJob(overrides) {
    return {
        title: faker.name.jobTitle(),
        id: faker.random.uuid(),
        company: faker.company.companyName(),
        company_url: faker.internet.url(),
        url: faker.internet.url(),
        location: faker.address.city(),
        how_to_apply: faker.lorem.paragraph()
    }
}

export {buildUser, buildItem, buildList, buildJob}