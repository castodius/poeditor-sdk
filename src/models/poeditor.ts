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
 * Richer project information
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

export interface ListProjectsResponse extends POEditorResponseBase {
  result: {
    projects: CompactProject[]
  }
}

export interface ViewProjectRequest extends POERequestBase {
  id: number;
}

export interface ViewProjectResponse extends POEditorResponseBase {
  result: {
    project: Project
  }
}

export interface AddProjectRequest {
  name: string;
  description?: string;
}

export interface AddProjectResponse extends POEditorResponseBase {
  result: {
    project: Project;
  }
}

export interface UpdateProjectRequest {
  id: number;
  name?: string;
  description?: string;
  reference_language?: string;
}

export interface UpdateProjectResponse extends POEditorResponseBase {
  result: {
    project: Project;
  }
}

export interface DeleteProjectRequest {
  id: number;
}

export interface DeleteProjectResponse extends POEditorResponseBase {

}

export interface UploadProjectRequest extends POERequestBase {
  id: number;
  updating: UpdateType;
  file: string;
  language?: string;
  overwrite?: POBoolean;
  sync_terms?: POBoolean;
  tags?: string[] | UpdateTagObject;
  read_from_source?: POBoolean;
  fuzzy_trigger?: POBoolean;
}

export interface UploadProjectResponse extends POEditorResponseBase {
  result: UpdateStatistics
}

export interface SyncProjectRequest extends POERequestBase {
  id: number;
  data: string;
}

export interface SyncProjectResponse extends POEditorResponseBase {
  result: UpdateStatistics
}

export interface ExportProjectRequest {
  id: number;
  language: string;
  type: FileType;
  filters?: ExportFilter[]
  tags?: string[];
  order?: string;
}

export interface ExportProjectResponse {
  result: {
    url: string;
  }
}

export interface AvailableLanguagesResponse extends POEditorResponseBase {
  result: {
    languages: Language[]
  }
}

export interface ListLanguagesRequest extends POERequestBase {
  id: number;
}

export interface ListLanguagesResponse extends POEditorResponseBase {
  result: {
    languages: ProjectLanguage[];
  }
}

export interface AddLanguageRequest extends POERequestBase {
  id: number;
  language: string;
}

export interface AddLanguageResponse extends POEditorResponseBase {

}

interface UpdateLanguageRequestBase extends POERequestBase {
  id: number;
  language: string;
  fuzzy_trigger?: POBoolean;
}

export interface UpdateLanguageRequest extends UpdateLanguageRequestBase {
  data: LanguageUpdateObject[];
}

export interface UpdateLanguageRequestInternal extends UpdateLanguageRequestBase {
  data: string;
}

export interface UpdateLanguageResponse extends POEditorResponseBase {
  result: {
    translations: UpdateStatisticsObject;
  }
}

export interface DeleteLanguageRequest extends POERequestBase {
  id: number;
  language: string;
}

export interface DeleteLanguageResponse extends POEditorResponseBase {

}

export interface ListTermsRequest extends POERequestBase {
  id: number;
  language?: string;
}

export interface ListTermsResponse extends POEditorResponseBase {
  result: {
    terms: Term[];
  }
}

export interface AddTermsRequest extends POERequestBase {
  id: number;
  terms: TermBase[];
}

export interface AddTermsRequestInternal extends POERequestBase {
  id: number;
  data: string;
}

export interface AddTermResponse extends POEditorResponseBase {
  result: {
    terms: UpdateStatisticsObject;
  }
}

export interface UpdateTermsRequest extends POERequestBase {
  id: number;
  fuzzy_trigger?: POBoolean;
  terms: UpdateTerm[];
}

export interface UpdateTermsRequestInternal extends POERequestBase {
  id: number;
  fuzzy_trigger?: POBoolean;
  data: string;
}

export interface UpdateTermsResponse extends POEditorResponseBase {
  result: {
    terms: UpdateStatisticsObject;
  }
}

export interface DeleteTermsRequest extends POERequestBase {
  id: number;
  terms: DeleteTerm[];
}

export interface DeleteTermRequestInternal extends POERequestBase {
  id: number;
  data: string;
}

export interface DeleteTermsResponse extends POEditorResponseBase {
  result: {
    terms: UpdateStatisticsObject;
  }
}

export interface AddCommentRequest extends POERequestBase {
  id: number;
  terms: AddTermComment[];
}

export interface AddCommentRequestInternal extends POERequestBase {
  id: number;
  data: string;
}

export interface AddCommentResponse extends POEditorResponseBase {
  result: {
    terms: UpdateStatisticsObject;
  }
}

export interface ListContributorsRequest extends POERequestBase {
  id?: number;
  language?: string;
}

export interface ListContributorsResponse extends POEditorResponseBase {
  result: {
    contributors: Contributor[]
  }
}

export interface AddContributorRequest extends POERequestBase {
  id: number;
  name: string;
  email: string;
  language?: string;
  admin?: POBoolean;
}

export interface AddContributorResponse extends POEditorResponseBase {

}

export interface RemoveContributorRequest extends POERequestBase {
  id: number;
  email: string;
  language?: string;
}

export interface RemoveContributorResponse extends POEditorResponseBase {

}
