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
  const projects: CompactProject[] = []
  const projectName = 'project 1'
  const description = 'A description'

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
  })

  describe('add project', () => {
    it('should add a project', async () => {
      const output = await client.addProject({
        name: 'project 1',
        description
      })
      projects.push(output)

      expect(output).toMatchObject({
        name: projectName,
        description
      })
    })
  })

  describe('view project', () => {
    it('should return project specific data', async () => {
      const output = await client.viewProject({ id: projects[0].id })

      expect(output).toMatchObject({
        name: projectName,
        description
      })
    })
  })

  describe('update project', () => {
    it('should update project data', async () => {
      const input = {
        id: projects[0].id,
        description: 'New text!',
        name: 'New name'
      }

      const output = await client.updateProject(input)

      expect(output).toMatchObject(input)
    })
  })
})
