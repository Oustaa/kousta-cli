// <% controller-import %>

export function initialiseControllers() {
  const controlers : any[]  = [
    //<% controller %>
    ];
  return controlers.map((Constroler) => new Constroler());
}
