import { APIGatewayProxyHandler } from 'aws-lambda';
import { HttpResponse } from '../helpers/HttpResponse';
import { CommerceToolsProvider } from '../providers';

const ctProvider = new CommerceToolsProvider(
  process.env as { [key: string]: string }
);

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    console.log('Lambda Invocation Event: ', JSON.stringify(event));
    const products = await ctProvider.fetchProducts();
    console.log('Products: ', products);
    return HttpResponse.success(products);
  } catch (e) {
    console.error('Error encountered', e);
    return HttpResponse.serverError(e);
  }
};
