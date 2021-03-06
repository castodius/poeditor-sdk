/**
 * Possible action completion answers from POEditor
 */
export enum Status {
  /**
   * The action succeeded
   */
  SUCCESS = 'success',
  /**
   * The action failed
   */
  FAIL = 'fail'
}

/**
 * True and false according to POEditor. 0 means False, 1 true
 */
export type POBoolean = 0 | 1;

/**
 * The different file types supported by POEditor. See https://poeditor.com/help/#SupportedFormats for more information
 */
export enum FileType {
  /**
   * Gettext
   */
  PO = 'po',
  /**
   * Gettext
   */
  POT = 'pot',
  /**
   * Machine Object
   */
  MO = 'mo',
  /**
   * Excel
   */
  XLS = 'xls',
  /**
   * Excel
   */
  XLSX = 'xlsx',
  /**
   * Comma separated values
   */
  CSV = 'csv',
  /**
   * INI
   */
  INI = 'ini',
  /**
   * Microsoft Resources
   */
  RES = 'resw',
  /**
   * Microsoft Resources
   */
  RESX = 'resx',
  /**
   * Android Resources
   */
  ANDROID_STRINGS = 'android_strings',
  /**
   * Apple Strings
   */
  APPLE_STRING = 'apple_strings',
  /**
   * iOS Xliff
   */
  XLIFF = 'xliff',
  /**
   * Java Properties
   */
  PROPERTIES = 'properties',
  /**
   * Key-Value JSON
   */
  KEY_VALUE_JSON = 'key_value_json',
  /**
   * Standard JSON
   */
  JSON = 'json',
  /**
   * YAML
   */
  YML = 'yml',
  /**
   * Angular XLIFF
   */
  XLF = 'xlf',
  /**
   * Angular XMB
   */
  XMB = 'xmb',
  /**
   * Angular XTB
   */
  XTB = 'xtb',
  /**
   * ARB
   */
  ARB = 'arb'
}

/**
 * The different filters you can use when exporting data
 */
export enum ExportFilter {
  /**
   * Export translated terms
   */
  TRANSLATED = 'translated',
  /**
   * Export untranslated terms
   */
  UNTRANSLATED = 'untranslated',
  /**
   * Export fuzzy terms
   */
  FUZZY = 'fuzzy',
  /**
   * Export terms which are not fuzzy
   */
  NOT_FUZZY = 'not_fuzzy',
  /**
   * Export terms that were translated automatically
   */
  AUTOMATIC = 'automatic',
  /**
   * Export terms that were not translated automatically
   */
  NOT_AUTOMATIC = 'not_automatic',
  /**
   * Export terms have been proofread
   */
  PROOFREAD = 'proofread',
  /**
   * Export terms have not been proofread
   */
  NOT_PROOFREAD = 'not_proofread'
}

/**
 * The type of update
 */
export enum UpdateType {
  /**
   * Update only terms
   */
  TERMS = 'terms',
  /**
   * Update terms and translations
   */
  TERMS_TRANSLATIONS = 'terms_translations',
  /**
   * Update only translations
   */
  TRANSLATIONS = 'translations'
}

/**
 * Tags added while uploading a file
 */
export enum UpdateTag {
  /**
   * Add tags to all terms
   */
  ALL = 'all',
  /**
   * Add tags to new terms
   */
  NEW = 'new',
  /**
   * Add tags to  terms which are in the project but not in the imported file
   */
  OBSOLETE = 'obsolete',
  /**
   * Add tags to terms with translations updates
   */
  OVERWRITTEN_TRANSLATIONS = 'overwritten_translations'
}

/**
 * Type of contributor
 */
export enum ContributorType {
  /**
   * Administrator. Able to add languages, terms and contributors to a project. Cannot delete a project (admin only)
   */
  ADMIN = 'administrator',
  /**
   * Can update translations for their available languages. Cannot administrate terms nor the project.
   */
  CONTRIBUTOR = 'contributor'
}

/**
 * Object containing tags to apply when uploading a file
 */
export type UpdateTagObject = Record<UpdateTag, string[]>

/**
 * Translation content. Can be a string or an object with singular/plural for the term.
 */
export type TranslationContent = string | { one: string, other: string };

/**
 * Object used when updating a translation for a language.
 */
export interface LanguageUpdateObject {
  /**
   * Term to update
   */
  term: string;
  /**
   * Context of term
   */
  context: string;
  /**
   * Translation of the term
   */
  translation: {
    /**
     * Translation of the term
     */
    content: TranslationContent
    /**
     * Trigger fuzzy on the translation or not
     */
    fuzzy?: POBoolean
  }
}

/**
 * Base used for all requests
 */
export interface POERequestBase {}

/**
 * Base for all responses
 */
export interface POEditorResponseBase {
  /**
   * Response object
   */
  response: {
    /**
     * Status of the request
     */
    status: Status;
    /**
     * String message from POEditor
     */
    message: string;
    /**
     * Status code
     */
    code: string;
  }
}

/**
 * Compact project information. Call view project to get more information
 */
export interface CompactProject {
  /**
   * Project id
   */
  id: number;
  /**
   * Project name
   */
  name: string;
  /**
   * Set to 1 if the project is public
   */
  public: POBoolean;
  /**
   * ???
   */
  open: POBoolean;
  /**
   * Date of creation
   */
  created: string;
}

/**
 * Rich project information
 */
export interface Project extends CompactProject {
  /**
   * Project description
   */
  description: string;
  /**
   * Reference language of the project
   */
  reference_language: string;
  /**
   * Number of terms
   */
  terms: number;
}

/**
 * Language object
 */
export interface Language {
  /**
   * Name of language
   */
  name: string;
  /**
   * ISO 639-1 language code
   */
  code: string;
}

/**
 * Object containing information about translations for a specific language in a project
 */
export interface ProjectLanguage extends Language {
  /**
   * Number of translations done
   */
  translations: number;
  /**
   * Percentage of translations done
   */
  percentage: number;
  /**
   * Last update date
   */
  updated: string;
}

/**
 * Term object
 */
export interface TermBase {
  /**
   * Term key. For example "MY_KEY"
   */
  term: string;
  /**
   * Combined with term to generate a unique identifier
   */
  context: string;
  /**
   * Plural of term
   */
  plural?: string;
  /**
   * Reference for term
   */
  reference?: string;
  /**
   * Tags attached to term
   */
  tags?: string[];
  /**
   * Comment to add to term
   */
  comment?: string;
}

/**
 * Returned when making changes to terms of a project
 */
export interface Term extends TermBase {
  /**
   * Created date
   */
  created: string;
  /**
   * Updated date
   */
  updated: string;
  /**
   * Translations for the term
   */
  translation: {
    /**
     * Translation of the term
     */
    content: TranslationContent;
    /**
     * Set to 1 if fuzzy
     */
    fuzzy: POBoolean;
    /**
     * Set to 1 if proofread
     */
    proofread: POBoolean;
    /**
     * Updated date
     */
    updated: string;
  };
}

/**
 * Used when changing term/context of a term
 */
export interface UpdateTerm extends TermBase {
  /**
   * New term to use instead of existing term
   */
  new_term: string;
  /**
   * New context to use instead of existing context
   */
  new_context: string;
}

/**
 * Object used when adding a comment to a term
 */
export interface AddTermComment {
  /**
   * Term to add comment to
   */
  term: string;
  /**
   * Context to add comment to
   */
  context: string;
  /**
   * The comment. Free text string.
   */
  comment: string;
}

/**
 * Object used when deleting a term
 */
export interface DeleteTerm {
  /**
   * Term to delete
   */
  term: string;
  /**
   * Term context
   */
  context: string;
}

/**
 * Statistics returned when modifying terms/translations
 */
export interface UpdateStatisticsObject {
  /**
   * Number of parsed terms
   */
  parsed?: number,
  /**
   * Number of terms added
   */
  added?: number,
  /**
   * Number of terms added
   */
  updated?: number,
  /**
   * Number of terms deleted
   */
  deleted?: number
}

/**
 * Object returned when modifying a project/terms/translations
 */
export interface UpdateStatistics {
  /**
   * Term statistics updates
   */
  terms?: UpdateStatisticsObject;
  /**
   * Translations statistics updates
   */
  translations?: UpdateStatisticsObject;
}

/**
 * Base object for contributor permissions
 */
export interface ContributorPermissionsBase {
  /**
   * Project for which user has some sort of access
   */
  project: {
    /**
     * Project id
     */
    id: string;
    /**
     * Project name
     */
    name: string;
  }
  /**
   * Set to true if contributor is a proofreader
   */
  proofreader: boolean
}

/**
 * Admin contributor object
 */
export interface AdminContributorPermissions extends ContributorPermissionsBase {
  /**
   * Admin user type
   */
  type: ContributorType.ADMIN;
}

/**
 * Regular contributor object
 */
export interface ContributorPermissions extends ContributorPermissionsBase {
  /**
   * Contributot user type
   */
  type: ContributorType.CONTRIBUTOR;
  /**
   * Languages which the contributor has access to
   */
  languages: string[]
}

export interface Contributor {
  name: string;
  email: string;
  permissions: (AdminContributorPermissions | ContributorPermissions)[];
}

/**
 * Beginning of requests and response
 */

/**
  * Response when listing projects
  */
export interface ListProjectsResponse extends POEditorResponseBase {
  result: {
    /**
     * List of projects
     */
    projects: CompactProject[]
  }
}

/**
 * Request when viewing a project
 */
export interface ViewProjectRequest extends POERequestBase {
  /**
   * Project id
   */
  id: number;
}

/**
 * Response when viewing a project
 */
export interface ViewProjectResponse extends POEditorResponseBase {
  result: {
    /**
     * Project data
     */
    project: Project
  }
}

/**
 * Request when adding a project
 */
export interface AddProjectRequest {
  /**
   * Name of project
   */
  name: string;
  /**
   * Project description
   */
  description?: string;
}

/**
 * Response when adding a project
 */
export interface AddProjectResponse extends POEditorResponseBase {
  result: {
    /**
     * Project data
     */
    project: Project;
  }
}

/**
 * Request when updating a project
 */
export interface UpdateProjectRequest {
  /**
   * Project id
   */
  id: number;
  /**
   * New project name
   */
  name?: string;
  /**
   * New project description
   */
  description?: string;
  /**
   * New referene language. Must be a part of the available languages for a project
   */
  reference_language?: string;
}

/**
 * Respone when updating a project
 */
export interface UpdateProjectResponse extends POEditorResponseBase {
  result: {
    /**
     * Project data
     */
    project: Project;
  }
}

/**
 * Request when deleting a project
 */
export interface DeleteProjectRequest {
  /**
   * Project id
   */
  id: number;
}

/**
 * Response when deleting a project
 */
export interface DeleteProjectResponse extends POEditorResponseBase {}

/**
 * Request when uploading a project via file
 */
export interface UploadProjectRequest extends POERequestBase {
  /**
   * Project id
   */
  id: number;
  /**
   * Type of update
   */
  updating: UpdateType;
  /**
   * File path to location on disk.
   */
  file: string;
  /**
   * Language to update
   */
  language?: string;
  /**
   * Overwrite matching terms
   */
  overwrite?: POBoolean;
  /**
   * Purge everything not present in the file. Dangerous operation.
   */
  sync_terms?: POBoolean;
  /**
   * Tags for all uploaded terms
   */
  tags?: string[] | UpdateTagObject;
  /**
   * For Xliff format.
   */
  read_from_source?: POBoolean;
  /**
   * Set other languages as fuzzy
   */
  fuzzy_trigger?: POBoolean;
}

/**
 * Response when uploading a project
 */
export interface UploadProjectResponse extends POEditorResponseBase {
  /**
   * Upload statistics
   */
  result: UpdateStatistics
}

/**
 * Request when syncing a project
 */
export interface SyncProjectRequest extends POERequestBase {
  /**
   * Project id
   */
  id: number;
  /**
   * Data to sync
   */
  data: string; // FIXME, separate into exposed and internal
}

/**
 * Response when syncing a project
 */
export interface SyncProjectResponse extends POEditorResponseBase {
  /**
   * Sync project statistics
   */
  result: UpdateStatistics
}

/**
 * Request when exporting a project
 */
export interface ExportProjectRequest {
  /**
   * Project id
   */
  id: number;
  /**
   * Language to export. ISO 639-1 code
   */
  language: string;
  /**
   * File format you want the exported file to have
   */
  type: FileType;
  /**
   * Filters to apply to data. Can be used to for example only export translated terms
   */
  filters?: ExportFilter[]
  /**
   * Filter results by tags
   */
  tags?: string[];
  /**
   * Set it to terms to order results by 'terms' alphabetically. Unknown what other options there are.
   */
  order?: string;
}

/**
 * Response when exporting a project
 */
export interface ExportProjectResponse {
  result: {
    /**
     * File url. Perform a GET operation on this url to download your file. Valid for 10 minutes.
     */
    url: string;
  }
}

/**
 * Response when getting available languages
 */
export interface AvailableLanguagesResponse extends POEditorResponseBase {
  result: {
    /**
     * List of available languages in POEditor
     */
    languages: Language[]
  }
}

/**
 * Request when listing languages for a project
 */
export interface ListLanguagesRequest extends POERequestBase {
  /**
   * Project id
   */
  id: number;
}

/**
 * Response when listing languages for a projet
 */
export interface ListLanguagesResponse extends POEditorResponseBase {
  result: {
    /**
     * Languages for a project and statistics about translations
     */
    languages: ProjectLanguage[];
  }
}

/**
 * Request when adding a language to a project
 */
export interface AddLanguageRequest extends POERequestBase {
  /**
   * Project id
   */
  id: number;
  /**
   * Language to add. ISO 639-1 code. Call getAvailableLanguages for a list.
   */
  language: string;
}

/**
 * Response when adding a language to a project
 */
export interface AddLanguageResponse extends POEditorResponseBase {}

/**
 * Request base when updating a language for a project
 */
interface UpdateLanguageRequestBase extends POERequestBase {
  /**
   * Project id
   */
  id: number;
  /**
   * Project language to update
   */
  language: string;
  /**
   * Trigger fuzzy on all new translations
   */
  fuzzy_trigger?: POBoolean;
}

/**
 * Request when updating a language for a project
 */
export interface UpdateLanguageRequest extends UpdateLanguageRequestBase {
  /**
   * List of terms to update
   */
  data: LanguageUpdateObject[];
}

/**
 * Actual request when updating a language for a project
 */
export interface UpdateLanguageRequestInternal extends UpdateLanguageRequestBase {
  /**
   * Data as string.
   */
  data: string;
}

/**
 * Response when updating a language for a project
 */
export interface UpdateLanguageResponse extends POEditorResponseBase {
  result: {
    /**
     * Statistics about translations for a language
     */
    translations: UpdateStatisticsObject;
  }
}

/**
 * Request when deleting a language from a project
 */
export interface DeleteLanguageRequest extends POERequestBase {
  /**
   * Project id
   */
  id: number;
  /**
   * Language to remove from project
   */
  language: string;
}

/**
 * Response when deleting a language from a project
 */
export interface DeleteLanguageResponse extends POEditorResponseBase {}

/**
 * Request when listing terms for a project
 */
export interface ListTermsRequest extends POERequestBase {
  /**
   * Project id
   */
  id: number;
  /**
   * Project language to list terms for
   */
  language?: string;
}

/**
 * Response when listing terms for a project
 */
export interface ListTermsResponse extends POEditorResponseBase {
  result: {
    /**
     * Project terms
     */
    terms: Term[];
  }
}

/**
 * Request when adding terms to a project
 */
export interface AddTermsRequest extends POERequestBase {
  /**
   * Project id
   */
  id: number;
  /**
   * List of terms to add to project
   */
  terms: TermBase[];
}

/**
 * Actual request when adding terms to a project
 */
export interface AddTermsRequestInternal extends POERequestBase {
  /**
   * Project id
   */
  id: number;
  /**
   * Data as string
   */
  data: string;
}

/**
 * Response when adding terms to a project
 */
export interface AddTermResponse extends POEditorResponseBase {
  result: {
    /**
     * Statistics about terms in the project
     */
    terms: UpdateStatisticsObject;
  }
}

/**
 * Request when updating terms in a project
 */
export interface UpdateTermsRequest extends POERequestBase {
  /**
   * Project id
   */
  id: number;
  /**
   * Set to 1 to trigger fuzzy on updated terms
   */
  fuzzy_trigger?: POBoolean;
  /**
   * List of terms to update
   */
  terms: UpdateTerm[];
}

/**
 * Actual request when updating terms
 */
export interface UpdateTermsRequestInternal extends POERequestBase {
  /**
   * Project id
   */
  id: number;
  /**
   * Set to 1 to trigger fuzzy on updated terms
   */
  fuzzy_trigger?: POBoolean;
  /**
   * Data as string
   */
  data: string;
}

/**
 * Response when updating terms for a project
 */
export interface UpdateTermsResponse extends POEditorResponseBase {
  result: {
    /**
     * Statistics about terms in the project
     */
    terms: UpdateStatisticsObject;
  }
}

/**
 * Request when deleting terms in a project
 */
export interface DeleteTermsRequest extends POERequestBase {
  /**
   * Project id
   */
  id: number;
  /**
   * Terms to delete
   */
  terms: DeleteTerm[];
}

/**
 * Actual request when deleting terms in a project
 */
export interface DeleteTermRequestInternal extends POERequestBase {
  /**
   * Project id
   */
  id: number;
  /**
   * Data as string
   */
  data: string;
}

/**
 * Response when deleting terms for a project
 */
export interface DeleteTermsResponse extends POEditorResponseBase {
  result: {
    /**
     * Statistics about terms in the project
     */
    terms: UpdateStatisticsObject;
  }
}

/**
 * Request when adding comments to terms
 */
export interface AddCommentRequest extends POERequestBase {
  /**
   * Project id
   */
  id: number;
  /**
   * List of terms and comments to add to them
   */
  terms: AddTermComment[];
}

/**
 * Actual request when adding comments to terms
 */
export interface AddCommentRequestInternal extends POERequestBase {
  /**
   * Project id
   */
  id: number;
  /**
   * Data as string
   */
  data: string;
}

/**
 * Response when adding comments to terms
 */
export interface AddCommentResponse extends POEditorResponseBase {
  result: {
    /**
     * Statistics about terms in the project
     */
    terms: UpdateStatisticsObject;
  }
}

/**
 * Request when listing contributors
 */
export interface ListContributorsRequest extends POERequestBase {
  /**
   * Project id. Mandatory if language is set
   */
  id?: number;
  /**
   * Language to list contributors for. If setting this you must also set project id.
   */
  language?: string;
}

/**
 * Response when listing contributors
 */
export interface ListContributorsResponse extends POEditorResponseBase {
  result: {
    /**
     * List of contributors
     */
    contributors: Contributor[]
  }
}

/**
 * Request when adding a contributor to a project
 */
export interface AddContributorRequest extends POERequestBase {
  /**
   * Project id
   */
  id: number;
  /**
   * Contributor name
   */
  name: string;
  /**
   * Contributor email. Used to access POEditor
   */
  email: string;
  /**
   * Required if not the contributor is not an administrator
   */
  language?: string;
  /**
   * Set to 1 to make the contributor an administrator
   */
  admin?: POBoolean;
}

/**
 * Response when adding a contributor
 */
export interface AddContributorResponse extends POEditorResponseBase {}

/**
 * Request to remove a contributor from a project
 */
export interface RemoveContributorRequest extends POERequestBase {
  /**
   * Project id
   */
  id: number;
  /**
   * Contributor email
   */
  email: string;
  /**
   * If not the contributor will be removed from the project. Does not work for administrators.
   */
  language?: string;
}

/**
 * Response when removing a contributor from a project
 */
export interface RemoveContributorResponse extends POEditorResponseBase {}
