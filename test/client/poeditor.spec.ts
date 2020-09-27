// to be tested
import { POEditor } from '@client/poeditor'
import { AddProjectRequest, CompactProject } from '@models/poeditor'

// to be mocked

// tools
import { sleep } from '@test/tools'

// models

/**
 * These tests are chained. PLEASE NOTE that the afterAll purges all projects bound to the API key
 * The tests do not come in the same order as the methods in client code
 */
describe('client/poeditor', () => {
  const client = new POEditor(process.env.API_KEY as string)
  const projects: CompactProject[] = []
  const projectName = 'project 1'
  const description = 'A description'
  let id: number

  beforeEach(() => {
  })

  afterEach(async () => {
    await sleep(100) // scared of calling the API too many times in a short period of time
  })

  afterAll(async () => {
    const projects = await client.listProjects()

    for (const project of projects) {
      await client.deleteProject({
        id: project.id
      })
    }
  })

  describe('list projects', () => {
    it('should return an empty array when no projects exist', async () => {
      const output = await client.listProjects()

      expect(output).toEqual(expect.arrayContaining([]))
    })
  })

  describe('error handling', () => {
    it('should throw if something went wrong', async () => {
      await expect(client.addProject({} as AddProjectRequest)).rejects.toThrow('Project name is mandatory!') //  <- message at time of writing this test
    })
  })

  describe('add project', () => {
    it('should add a project', async () => {
      const output = await client.addProject({
        name: 'project 1',
        description
      })
      projects.push(output)
      id = output.id

      expect(output).toMatchObject({
        name: projectName,
        description
      })
    })
  })

  describe('view project', () => {
    it('should return project specific data', async () => {
      const output = await client.viewProject({ id })

      expect(output).toMatchObject({
        name: projectName,
        description
      })
    })
  })

  describe('update project', () => {
    it('should update project data', async () => {
      const input = {
        id,
        description: 'New text!',
        name: 'New name'
      }

      const output = await client.updateProject(input)

      expect(output).toMatchObject(input)
    })
  })

  describe('delete project', () => {
    /**
     * Weird test structure
     */
    it('should delete a project', async () => {
      const project = await client.addProject({
        name: 'tmp'
      })

      const output = await client.listProjects()

      expect(output).toHaveLength(2)
      expect(output[1]).toMatchObject({
        id: project.id
      })

      await client.deleteProject({ id: project.id })
      const secondOutput = await client.listProjects()

      expect(secondOutput).toHaveLength(1)
    })
  })

  describe('get available languages', () => {
    it('should return a list of all available languages', async () => {
      const output = await client.getAvailableLanguages()

      expect(output).toBeInstanceOf(Array)
      expect(output[0]).toMatchObject({
        name: expect.stringMatching(/.*/),
        code: expect.stringMatching(/^[a-z]{2}$/)
      })
    })
  })

  describe('get project languages', () => {
    it('should list project languages', async () => {
      const output = await client.getProjectLanguages({ id })

      expect(output).toHaveLength(0)
    })
  })

  describe('add language', () => {
    it('should add a language to a project', async () => {
      await client.addLanguage({
        id,
        language: 'sv'
      })
      const output = await client.getProjectLanguages({ id })

      expect(output).toHaveLength(1)
    })
  })

  describe('delete language', () => {
    it('should delete a language from a project', async () => {
      await client.addLanguage({
        id,
        language: 'en'
      })
      const output = await client.getProjectLanguages({ id })
      expect(output).toHaveLength(2)

      await client.deleteLanguage({ id, language: 'en' })

      const secondOutput = await client.getProjectLanguages({ id })
      expect(secondOutput).toHaveLength(1)
    })
  })

  describe('list terms', () => {
    it('should list terms', async () => {
      const output = await client.listTerms({ id })

      expect(output).toHaveLength(0)
    })
  })

  describe('add terms', () => {
    it('should add terms to a project', async () => {
      const output = await client.addTerms({
        id,
        terms: [
          {
            term: 'term1',
            context: 'context1'
          },
          {
            term: 'term2',
            context: 'context2'
          }
        ]
      })

      expect(output).toEqual({
        parsed: 2,
        added: 2
      })

      const secondOutput = await client.listTerms({ id })

      expect(secondOutput).toHaveLength(2)
    })
  })
})
