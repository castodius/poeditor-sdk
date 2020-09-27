// to be tested
import { POEditor } from '@client/poeditor'
import { CompactProject } from '@models/poeditor'

// to be mocked

// tools
import { sleep } from '@test/tools'

// models

/**
 * These tests are chained. Please note that the beforeAll will throw if the account has more than zero projects.
 */
describe('client/poeditor', () => {
  const client = new POEditor(process.env.API_KEY as string)
  const projectNames = ['project 1', 'project 2']
  const projects: CompactProject[] = []
  const description = 'Some text'

  beforeEach(() => {
  })

  afterEach(async () => {
    await sleep(100) // scared of calling the API too many times in a short period of time
  })

  describe('list projects', () => {
    it('should return an empty array when no projects exist', async () => {
      const output = await client.listProjects()

      expect(output).toEqual(expect.arrayContaining([]))
    })

    /* it('should return updated information if something gets deleted', async () => {
      await client.deleteProject({
        id: projects[0].id
      })
      projects.shift()

      const output = await client.listProjects()

      expect(output).toHaveLength(1)
      expect(output[0]).toMatchObject({
        name: projectNames[1]
      })
    }) */
  })

  describe('add projects', () => {
    it('should add projects', async () => {
      await client.addProject({
        name: projectNames[0]
      })
      await client.addProject({
        name: projectNames[1],
        description
      })

      const output = await client.listProjects()
      projects.push(...output)

      expect(output).toHaveLength(2)
      expect(output[0]).toMatchObject({
        name: projectNames[0]
      })
      expect(output[1]).toMatchObject({
        name: projectNames[1]
      })
    })
  })

  describe('view project', () => {
    it('should return project specific data', async () => {
      const output = await client.viewProject({ id: projects[1].id })

      expect(output).toMatchObject({
        name: projectNames[1],
        description
      })
    })
  })
})
