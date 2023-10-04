import {Suspense} from 'react';

// project import
import Loader from './Loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component:React.FC) => (props:any) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
