const actorColors = {
  England: "rgb(119,43,21)",
  Americas: "rgb(222,145,49)",
  France: "rgb(60,100,100)",
  Holland: "rgb(68,108,73)",
  Sweden: "rgb(217,182,17)",
  Spain: "rgb(209,42,5)",
  Mexico: "rgb(209,42,5)",
  Native: "native",
};

const womensRightsActorColors = {
  Legislature: actorColors.England,
  Women: actorColors.Americas,
  Court: actorColors.France,
};

function actorsIn(data) {
  if (Array.isArray(data)) {
    const uniqueActors = new Set(data.flatMap((obj) => obj.actors));
    return [...uniqueActors].map((actor) => ({
      actor,
      color: actorColors[actor],
    }));
  }

  // TODO: Ideally change this
  return undefined;
}

function dataToYears(data) {
  const yearsObj = {};

  for (const curr of data) {
    if (!yearsObj[curr.year]) {
      yearsObj[curr.year] = Array(9).fill(undefined);
    }
    if (curr.squares === "full") {
      if (curr.actors.length === 3) {
        const top = curr.actors[0];
        const left = curr.actors[1];
        const bot = curr.actors[2];
        const actorsArray = [
          [top, left, top, left, "trigger edge case"],
          [top],
          [top, bot],
          [left],
          [top, left, bot],
          [bot],
          [left, bot],
          [bot],
          [bot],
        ];
        yearsObj[curr.year] = actorsArray.map((actors) => ({
          event: curr.event,
          actors,
        }));
      } else if (curr.actors.length === 2) {
        const top = [curr.actors[0]];
        const bottom = [curr.actors[1]];
        const both = [curr.actors[0], curr.actors[1]];
        const actorsArray = [
          top,
          top,
          both,
          top,
          both,
          bottom,
          both,
          bottom,
          bottom,
        ];
        yearsObj[curr.year] = actorsArray.map((actors) => ({
          event: curr.event,
          actors,
        }));
      } else {
        yearsObj[curr.year] = Array(9).fill({
          event: curr.event,
          actors: curr.actors,
        });
      }
    } else {
      for (const squareNum of curr.squares) {
        yearsObj[curr.year][squareNum - 1] = {
          event: curr.event,
          actors: curr.actors,
        };
      }
    }
  }

  return yearsObj;
}

export { actorsIn, actorColors, dataToYears, womensRightsActorColors };
