// @flow
import type { State as AppState } from '../reducers/app';
import type { State as CarsState } from '../reducers/cars';
import type { State as ErrorState } from '../reducers/error';
import type { State as PlanesState } from '../reducers/planes';
import type { State as ZonesState } from '../reducers/zones';

export type State = $ReadOnly<{
    app: AppState,
    cars: CarsState,
    error: ErrorState,
    planes: PlanesState,
    zones: ZonesState
}>;