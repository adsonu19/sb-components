import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Layout } from '../../src';
import { RouterDecorator } from '../RouterDecorator';
import { SiteLinks } from './mocks';


const body = <div className="test-container"><div className="container"><p>Test Body...</p></div></div>
storiesOf("Layout", module)
    .addDecorator(RouterDecorator)
    .add("name no links no body", () => <Layout siteName="Test" />)
    .add("name links and body", () => <Layout children={body} siteName="Test" links={SiteLinks} />)