export interface Model {
  /**
   * Unique identifier for the model. Uses the run_id returned from the API.
   */
  id: string;
  /**
   * The underlying model type (e.g., lightgbm, xgboost).
   */
  model_type: string;
  /**
   * Human readable name of the model.
   */
  name: string;
  /**
   * Version string of the model.
   */
  version: string;
  /**
   * Stage of the model within the ML lifecycle.
   */
  stage: string;
  /**
   * Run identifier from the model registry.
   */
  run_id: string;
  /**
   * List of required input field names.
   */
  signature_inputs: string[];
}
