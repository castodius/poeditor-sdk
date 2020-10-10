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

export interface CompactProject {
  id: number;
  name: string;
  public: POBoolean;
  open: POBoolean;
  created: string;
}

export interface Project extends CompactProject {
  description: string;
  reference_language: string;
  terms: number;
}

export interface Language {
  name: string;
  code: string;
}

export interface ProjectLanguage extends Language {
  translations: number;
  percentage: number;
  updated: string;
}

export interface TermBase {
  term: string;
  context: string;
  plural?: string;
  reference?: string;
  tags?: string[];
  comment?: string;
}

export interface Term extends TermBase {
  created: string;
  updated: string;
  translation: {
    content: TranslationContent;
    fuzzy: POBoolean;
    proofread: POBoolean;
    updated: string;
  };
}

export interface UpdateTerm extends TermBase {
  new_term: string;
  new_context: string;
}

export interface AddTermComment {
  term: string;
  context: string;
  comment: string;
}

export interface DeleteTerm {
  term: string;
  context: string;
}

export interface UpdateStatisticsObject {
  parsed?: number,
  added?: number,
  updated?: number,
  deleted?: number
}

export interface UpdateStatistics {
  terms?: UpdateStatisticsObject;
  translations?: UpdateStatisticsObject;
}

export interface ContributorPermissionsBase {
  project: {
    id: string;
    name: string;
  }
  proofreader: boolean
}

export interface AdminContributorPermissions extends ContributorPermissionsBase {
  type: ContributorType.ADMIN;
}

export interface ContributorPermissions extends ContributorPermissionsBase {
  type: ContributorType.CONTRIBUTOR;
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
