import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular'; 
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

@NgModule({ 
  imports: [HttpClientModule, ApolloModule], 
  providers: [ 
    { 
    provide: APOLLO_OPTIONS, 
    useFactory: (httpLink: HttpLink) => { 
      return { 
        cache: new InMemoryCache(), 
        link: httpLink.create({ 
          uri: 'http://localhost:8081/graphql', // Lien vers votre service GraphQL 
          }), 
        }; 
      },
       deps: [HttpLink], 
      }, 
    ], 
    exports: [ApolloModule]
  })
export class GraphQLModule { }
