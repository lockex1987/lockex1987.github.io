<mytag9>
    <ol>
        <li each="{city in cities}">{city}</li>
    </ol>

    <ol>
        <li each="{city in cities2}">{city.name} - {city.country}</li>
    </ol>
    
    <ol>
        <li each="{cities2}">{name} - {country}</li>
    </ol>

    <script>
this.cities = ["New York", "London", "Tokyo"];
this.cities2 = [
    { name : "Shanghai" , country:"China"       },
    { name : "Seoul"    , country:"South Korea" },
    { name : "Moscow"   , country:"Russia"      }
];
</script>
</mytag9>