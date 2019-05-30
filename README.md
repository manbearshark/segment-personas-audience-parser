# Segment Personas Audience Fields Parser

Parses user IDs and external IDs from a Segment Personas CSV output file.

## Usage


```
yarn install
node index.js <name of a Segment CSV file>
```

There are two example audience files in the repo.

The output will be a CSV with the columns set to:

```
Personas Audience User ID, User ID, Email
```

This code currently returns the first email in what is a list of emails.
