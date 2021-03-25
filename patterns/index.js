const patternDict=[{
    pattern: '\\b(?<greeting>Hi|Hello|Hey|Bonjour|Merhaba)\\b',
    intent: 'Hello',
},{
    pattern:'\\b(Bye|Exit)\\b',
    intent: 'Exit',
},{
    pattern:'\\b(Help|Aide|Secours|lost)\\b',
    intent:'Help',
},{   
    pattern:'\\b(I am at )\\b(?<location>.+)',
    intent:'Location',
}
];
module.exports = patternDict;