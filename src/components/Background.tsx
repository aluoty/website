import { Starfield } from '../Starfield';

export function Background() {
  return (
    <>
      <Starfield />
      <div className="nebula nebula--one" aria-hidden="true" />
      <div className="nebula nebula--two" aria-hidden="true" />
    </>
  );
}
