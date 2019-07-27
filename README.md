# Segment Personas Audience and Traits Fields Parser

Parses user IDs and external IDs from a Segment Personas CSV output file.

Now also handles audience files as well.

## Usage

```
yarn install
node index.js <name of a Segment Audience CSV file>
node traits.js <name of a Segment Traits CSV file>
```

# Audiences
There are two example audience files in the repo.

The output for audiences will be a CSV with the columns set to:

```
Personas Audience User ID, User ID, Email
```

# Traits
This code currently returns the first email in what is a list of emails.

There is one example traits file in the repo.

The output for traits files will be a CSV with the columns set to:

```
email, anonymous_id, <all the traits columns in the traits JSON>
```
