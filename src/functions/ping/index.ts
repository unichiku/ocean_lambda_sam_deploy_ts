import { APIGatewayEvent, Context, Callback } from "aws-lambda";

const handler = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
): void => {
  const result = {
    status: 200,
    message: "hello :)",
  };

  callback(null, {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(result),
  });
};

export { handler };
