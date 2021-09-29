import {ControllerOptions, PathType, ActionConfig, ControllerConfig, MiddlewareDefination}  from './types';

export const controllerRegistery = new Set<ControllerConfig>();
export const middlewaresRegistery = new Map<String, MiddlewareDefination>();

