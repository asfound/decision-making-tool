export default class Route {
  constructor(
    public paths: string[],
    public callback: () => Promise<void>
  ) {}
}
