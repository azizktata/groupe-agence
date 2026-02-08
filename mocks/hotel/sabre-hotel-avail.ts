export const MOCK_SABRE_HOTEL_AVAIL_RESPONSE = {
  GetHotelAvailRS: {
    ApplicationResults: {
      status: "Complete",
      Success: [
        {
          timeStamp: "2024-05-30T00:17:56.715-05:00",
        },
      ],
      Warning: [
        {
          type: "Application",
          timeStamp: "2024-05-30T00:17:56.709-05:00",
          SystemSpecificResults: [
            {
              Message: [
                {
                  code: "WARN.0724",
                  value: "Vendor response error",
                },
                {
                  code: "WarningDetails",
                  value: "112 - No Results Available",
                },
                {
                  code: "WarningDetails",
                  value: "100-Invalid hotel code",
                },
              ],
            },
          ],
        },
        {
          type: "Application",
          timeStamp: "2024-05-30T00:17:56.709-05:00",
          SystemSpecificResults: [
            {
              Message: [
                {
                  code: "WARN.0322",
                  value: "No availability",
                },
                {
                  code: "WarningDetails",
                  value: "100-Invalid property code",
                },
              ],
            },
          ],
        },
        {
          type: "Application",
          timeStamp: "2024-05-30T00:17:56.709-05:00",
          SystemSpecificResults: [
            {
              Message: [
                {
                  code: "WARN.0123",
                  value: "Too many children",
                },
                {
                  code: "WarningDetails",
                  value:
                    "100-Shopping for children not supported for requested rate source",
                },
              ],
            },
          ],
        },
      ],
    },
    HotelAvailInfos: {
      OffSet: 1,
      MaxSearchResults: 163,
      ShopKey: "lwsf8wzmk0",
      SearchLatitude: 32.758,
      SearchLongitude: -97.08,
      HotelAvailInfo: [
        {
          HotelInfo: {
            HotelCode: "100074506",
            CodeContext: "GLOBAL",
            HotelName: "Baymont Inn And Suites Arlington - Near Six Flags",
            ChainCode: "BU",
            ChainName: "Baymont Inns And Suites by Wyndham",
            BrandCode: "10000",
            BrandName: "undefined",
            Distance: 0.89,
            Direction: "E",
            UOM: "MI",
            SabreRating: "2.5",
            Ordinal: 1,
            SabreHotelCode: "38964",
            CanReturnRequestedNegotiatedRate: false,
            LocationInfo: {
              Latitude: "32.75341",
              Longitude: "-97.06569",
              Address: {
                AddressLine1: "2401 Diplomacy Drive",
                CityName: {
                  CityCode: "DFW",
                  value: "Arlington",
                },
                StateProv: {
                  StateCode: "TX",
                  value: "",
                },
                PostalCode: "76011",
                CountryName: {
                  Code: "US",
                  value: "United States of America",
                },
              },
              Contact: {
                Phone: "1-817-6332434",
                Fax: "1-817-6333500",
              },
            },
            Amenities: {
              Amenity: [
                {
                  Code: 101,
                  Description: "Wheelchair access",
                  value: "",
                },
                {
                  Code: 162,
                  Description: "Meal plan available",
                  value: "Y",
                },
                {
                  Code: 168,
                  Description: "Onsite laundry",
                  ComplimentaryInd: false,
                  value: "Coin Laundry",
                },
                {
                  Code: 198,
                  Description: "Non-smoking rooms (generic)",
                  value: "",
                },
                {
                  Code: 2002,
                  Description: "Stay Safe",
                  value: "",
                },
                {
                  Code: 2035,
                  Description: "Recreation Facilities",
                  value: "",
                },
                {
                  Code: 227,
                  Description: "Complimentary breakfast",
                  value: "CONTINENTAL",
                },
                {
                  Code: 228,
                  Description: "Business center",
                  value: "",
                },
                {
                  Code: 236,
                  Description: "Golf",
                  value: "",
                },
                {
                  Code: 259,
                  Description: "High speed internet access",
                  value: "WIRELESS",
                },
                {
                  Code: 260,
                  Description: "Interior corridors",
                  value: "",
                },
                {
                  Code: 269,
                  Description: "Meeting rooms",
                  value: "",
                },
                {
                  Code: 48,
                  Description: "Health club",
                  value: "",
                },
                {
                  Code: 66,
                  Description: "Outdoor pool",
                  value: "",
                },
                {
                  Code: 71,
                  Description: "Pool",
                  value: "",
                },
                {
                  Code: 68,
                  Description: "Parking",
                  value: "Y-COMPLIMENTARY",
                },
                {
                  Code: 42,
                  Description: "Free Parking",
                  value: "",
                },
              ],
            },
            SecurityFeatures: {
              SecurityFeature: [
                {
                  Code: 9,
                  Description: "Complies with Local/State/Federal fire laws",
                  value: "Y",
                },
              ],
            },
            PropertyQualityInfo: {
              PropertyQuality: [
                {
                  Code: 5,
                  Description: "Regular",
                },
              ],
            },
          },
          HotelRateInfo: {
            RateInfos: {
              ConvertedRateInfo: [
                {
                  StartDate: "2025-02-21",
                  EndDate: "2025-02-23",
                  AmountBeforeTax: "110.50",
                  AmountAfterTax: "136.66",
                  AverageNightlyRate: "68.33",
                  AverageNightlyRateBeforeTax: "55.25",
                  HighestNightlyRate: "55.25",
                  ApproxTotalPrice: "136.66",
                  CurrencyCode: "USD",
                  AdditionalFeesInclusive: false,
                  TaxInclusive: true,
                  RateSource: "110",
                  RateKey:
                    "ReY9ZtihvHSgURIP1cNjUCCUx+ax/rnRQ0ns+fkjH1qYz2DE8bfasTv9GyqynxyqvBp6+MAvo5WYnJUoHjOh79p7KjzErzjpfaUdBIIH8D4bQaij6mAN1yTvgO2tTg9BdmcYgfd5g1cZXLs03V0NbpHVB+B3aZ5ockm4OFbKu8E5HqWSAwHLt1MQIGxQJi3z7O/IJJKafyWyq97/l0hi/Q2Z8M1PQC0Q2YWEyPqpnFMczSZtK2SpooiLvwmDbJR4rMxDOC8ZyBerWZYUW8iP996eMM8DY/fPQ9Q5Rk1uzGpjhN7m5StzvukjAh/KWKYjbRyR5NKWtldjd8N3hO4PCf1K6fZPLNAdYmz6zeEasBthbwOlDeVzjq/eapwuub9sFbOfqq0a6rHXRHldk12x6PvVIFFNv430n+Jb4gniH8GXwwRs99z8IuOnfjoA/oOPkKfhRGA66wVwilnySfO0Bvpa0+fptUIcBZPrq+xLZETD/GSxZIJ5PBA3wxQIiGO0A/T04pZZzoY2JpMGTNg1syMXhOHEiktHX8cnxBsLY8YD3NXFUqeHA05bVcIJT1SwRbLZJqj8cRiTuAR+bfLNolJK5ylwnPK5AXTyN+Qe/VvZD8UveKMSZUnvUNFfxIOvSnvuY7KN3W6MDM4IrVC504NF4SL89Lnakj6VAOgkmSg6/n9bwYklGAXD6KSZbGUYN+1WiouLLKq7KM+MsmtYxmFrD4s2dPhiVdJGEWUUMju9Biia6sIc5955MFh4bGMClKNxYKiRau6jlv8MnNb9J2s66oztnRQdIXHsjvIGSFffPABhvPuGBwF3x5c/idGAZi1QTlRDygidTWxfVcBXMZOIxisXx2XLTcV2uyDBtQ6266RW6Sdv2raw+fil5z7U0rwF/Jht+01zt+LtG970RpCJ3j8+GNlKTOgdyVNgXb1eS9empoyFnYeY3dKozC6PyskG2IPMVR1mWoAEcB2i3dZzz47QrNLdYdM/ppoD8U6k9PKvlVcgJDDWmfGKGGLkC9KldVuQjMlieNsdwbymx1lZy3QgCUiT1H2+FOoxzthzRzLs6BcfqW9DHiAc96dxGKa2Tzb9RvT9RMSmSvyiyA==",
                  Commission: {
                    Amount: "0.93",
                    CurrencyCode: "USD",
                    Type: "Amount",
                  },
                },
                {
                  StartDate: "2025-02-21",
                  EndDate: "2025-02-23",
                  AmountBeforeTax: "130.00",
                  AmountAfterTax: "130.00",
                  AverageNightlyRate: "65.00",
                  AverageNightlyRateBeforeTax: "65.00",
                  HighestNightlyRate: "65.00",
                  ApproxTotalPrice: "160.09",
                  CurrencyCode: "USD",
                  AdditionalFeesInclusive: false,
                  TaxInclusive: true,
                  RateSource: "113",
                  RateKey:
                    "Aq5G+RC74EV3vVQF0MBOJ2tYWHpBY4t7HedVXmwY9iNK+JYbpf1YLxwxQU3Sekl5vhnA1Z/lhU6xvvfeU/X/Zo8pc0CMDDJuukPRPcb4jot0kX0rAt4GbcFvfhn9xLCmSSZFASckTA1mAgtraKTxj06XUd3bOQ3qKJy9b+rjSrKv/vUCRnsiiyeiXBU0zEpZjSQgbIBEv4rA+O6xGpPyF7+ZemUxeuXi2SD4WEP+J6c1MUjrDieGGoRFiMd+bePMYv8SYmO2qd5ztm5gi9gQ9gwpMC5Po1AzB/rv0mq0CDJlcnwzhfvD67Pe6jTzCvWm1ta+cQ3GILHgUa+In5LZUMumgFrnD+8cmTTXSaxekAH7WkUBQ2XaCoKvAB4UcHXmi6LxDFugCr9WDe/SFoQpXGgKkvf+U53C5R2TB2IO926u6dStdIithAVVQfQ/QrgvPqvG8GPD99mn0w5KEFj0gOUNCAzV0Y99AkK0PPPv7wtWHGZhHMqf6Dn62qSHsmoaFehjsuH7TkgjmQcIS4rbuN2Ms446U94jc/emPIBqOBk=",
                },
              ],
            },
            Rooms: {
              Room: [
                {
                  RoomIndex: 1,
                  Adults: 1,
                  Children: 1,
                  BedTypeOptions: {
                    BedTypes: [
                      {
                        BedType: [
                          {
                            Code: 5,
                            Description: "Queen",
                          },
                        ],
                      },
                    ],
                  },
                  RoomDescription: {
                    Name: "Room, 1 Queen Bed, Accessible, Non Smoking (Mobility,Hearing,Tub w/Grab Bars)",
                    Text: [
                      "Room, 1 Queen Bed, Accessible, Non Smoking (Mobility,Hearing,Tub w/Grab Bars)",
                    ],
                  },
                  Amenities: {
                    Amenity: [
                      {
                        Code: 74,
                        Description: "Non-smoking",
                        value: "",
                      },
                    ],
                  },
                  RatePlans: {
                    RatePlan: [
                      {
                        RatePlanName:
                          "Room, 1 Queen Bed, Accessible, Non Smoking (Mobility,Hearing,Tub w/Grab Bars)",
                        RatePlanType: "13",
                        RatePlanTypeDescription: "Regular/rack",
                        PrepaidIndicator: true,
                        AvailableQuantity: 4,
                        RateSource: "110",
                        RateKey:
                          "ReY9ZtihvHSgURIP1cNjUCCUx+ax/rnRQ0ns+fkjH1qYz2DE8bfasTv9GyqynxyqvBp6+MAvo5WYnJUoHjOh79p7KjzErzjpfaUdBIIH8D4bQaij6mAN1yTvgO2tTg9BdmcYgfd5g1cZXLs03V0NbpHVB+B3aZ5ockm4OFbKu8E5HqWSAwHLt1MQIGxQJi3z7O/IJJKafyWyq97/l0hi/Q2Z8M1PQC0Q2YWEyPqpnFMczSZtK2SpooiLvwmDbJR4rMxDOC8ZyBerWZYUW8iP996eMM8DY/fPQ9Q5Rk1uzGpjhN7m5StzvukjAh/KWKYjbRyR5NKWtldjd8N3hO4PCf1K6fZPLNAdYmz6zeEasBthbwOlDeVzjq/eapwuub9sFbOfqq0a6rHXRHldk12x6PvVIFFNv430n+Jb4gniH8GXwwRs99z8IuOnfjoA/oOPkKfhRGA66wVwilnySfO0Bvpa0+fptUIcBZPrq+xLZETD/GSxZIJ5PBA3wxQIiGO0A/T04pZZzoY2JpMGTNg1syMXhOHEiktHX8cnxBsLY8YD3NXFUqeHA05bVcIJT1SwRbLZJqj8cRiTuAR+bfLNolJK5ylwnPK5AXTyN+Qe/VvZD8UveKMSZUnvUNFfxIOvSnvuY7KN3W6MDM4IrVC504NF4SL89Lnakj6VAOgkmSg6/n9bwYklGAXD6KSZbGUYN+1WiouLLKq7KM+MsmtYxmFrD4s2dPhiVdJGEWUUMju9Biia6sIc5955MFh4bGMClKNxYKiRau6jlv8MnNb9J2s66oztnRQdIXHsjvIGSFffPABhvPuGBwF3x5c/idGAZi1QTlRDygidTWxfVcBXMZOIxisXx2XLTcV2uyDBtQ6266RW6Sdv2raw+fil5z7U0rwF/Jht+01zt+LtG970RpCJ3j8+GNlKTOgdyVNgXb1eS9empoyFnYeY3dKozC6PyskG2IPMVR1mWoAEcB2i3dZzz47QrNLdYdM/ppoD8U6k9PKvlVcgJDDWmfGKGGLkC9KldVuQjMlieNsdwbymx1lZy3QgCUiT1H2+FOoxzthzRzLs6BcfqW9DHiAc96dxGKa2Tzb9RvT9RMSmSvyiyA==",
                        LoyaltyPoints: false,
                        RatePlanDescription: {
                          Text: [
                            "Room, 1 Queen Bed, Accessible, Non Smoking (Mobility,Hearing,Tub w/Grab Bars)",
                          ],
                        },
                        RatePlanInclusions: {
                          RatePlanInclusion: [
                            {
                              Description: "Free parking",
                              Code: 42,
                            },
                            {
                              Description: "Complimentary wireless internet",
                              Code: 286,
                            },
                          ],
                        },
                        MealsIncluded: {
                          Breakfast: true,
                          Lunch: false,
                          Dinner: false,
                          MealPlanIndicator: true,
                          MealPlanCode: 19,
                          MealPlanDescription: "Breakfast",
                        },
                        ConvertedRateInfo: {
                          StartDate: "2025-02-21",
                          EndDate: "2025-02-23",
                          AmountBeforeTax: "110.50",
                          AmountAfterTax: "136.66",
                          AverageNightlyRate: "68.33",
                          AverageNightlyRateBeforeTax: "55.25",
                          HighestNightlyRate: "55.25",
                          ApproxTotalPrice: "136.66",
                          CurrencyCode: "USD",
                          AdditionalFeesInclusive: false,
                          TaxInclusive: true,
                          Taxes: {
                            Amount: "26.16",
                            CurrencyCode: "USD",
                            TaxGroups: {
                              TaxGroup: [
                                {
                                  Code: 201,
                                  Description:
                                    "Tax Recovery Charges and Service Fees",
                                  Amount: "26.16",
                                  CurrencyCode: "USD",
                                  TaxDescription: {
                                    Text: [
                                      "Tax Recovery Charges and Service Fees",
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                          CancelPenalties: {
                            CancelPenalty: [
                              {
                                Refundable: false,
                              },
                            ],
                          },
                          Guarantee: {
                            GuaranteeType: "DEP",
                            GuaranteesAccepted: {
                              GuaranteeAccepted: [
                                {
                                  GuaranteeTypeCode: 5,
                                  GuaranteeTypeDescription: "Credit card",
                                },
                              ],
                            },
                          },
                        },
                      },
                    ],
                  },
                },
                {
                  RoomIndex: 1,
                  RoomType: "Guest room",
                  RoomTypeCode: 42,
                  Adults: 1,
                  Children: 1,
                  RoomDescription: {
                    Text: [
                      "Queen Room with Bath Tub - Mobility/Hearing Accessible - Non-Smoking",
                    ],
                  },
                  RatePlans: {
                    RatePlan: [
                      {
                        RatePlanName:
                          "Queen Room with Bath Tub - Mobility/Hearing Accessible - Non-Smoking",
                        RatePlanType: "13",
                        RatePlanTypeDescription: "Regular/rack",
                        PrepaidIndicator: false,
                        AvailableQuantity: 4,
                        RateSource: "113",
                        RateKey:
                          "Aq5G+RC74EV3vVQF0MBOJ2tYWHpBY4t7HedVXmwY9iNK+JYbpf1YLxwxQU3Sekl5vhnA1Z/lhU6xvvfeU/X/Zo8pc0CMDDJuukPRPcb4jot0kX0rAt4GbcFvfhn9xLCmSSZFASckTA1mAgtraKTxj06XUd3bOQ3qKJy9b+rjSrKv/vUCRnsiiyeiXBU0zEpZjSQgbIBEv4rA+O6xGpPyF7+ZemUxeuXi2SD4WEP+J6c1MUjrDieGGoRFiMd+bePMYv8SYmO2qd5ztm5gi9gQ9gwpMC5Po1AzB/rv0mq0CDJlcnwzhfvD67Pe6jTzCvWm1ta+cQ3GILHgUa+In5LZUMumgFrnD+8cmTTXSaxekAH7WkUBQ2XaCoKvAB4UcHXmi6LxDFugCr9WDe/SFoQpXGgKkvf+U53C5R2TB2IO926u6dStdIithAVVQfQ/QrgvPqvG8GPD99mn0w5KEFj0gOUNCAzV0Y99AkK0PPPv7wtWHGZhHMqf6Dn62qSHsmoaFehjsuH7TkgjmQcIS4rbuN2Ms446U94jc/emPIBqOBk=",
                        LoyaltyPoints: false,
                        RatePlanDescription: {
                          Text: [
                            "Queen Room with Bath Tub - Mobility/Hearing Accessible - Non-Smoking",
                          ],
                        },
                        ConvertedRateInfo: {
                          StartDate: "2025-02-21",
                          EndDate: "2025-02-23",
                          AmountBeforeTax: "130.00",
                          AmountAfterTax: "130.00",
                          AverageNightlyRate: "65.00",
                          AverageNightlyRateBeforeTax: "65.00",
                          HighestNightlyRate: "65.00",
                          ApproxTotalPrice: "160.09",
                          CurrencyCode: "USD",
                          AdditionalFeesInclusive: false,
                          TaxInclusive: true,
                          Fees: {
                            Amount: "30.09",
                            CurrencyCode: "USD",
                            FeeGroups: {
                              FeeGroup: [
                                {
                                  Code: 14,
                                  Description: "Service charge",
                                  Amount: "7.60",
                                  CurrencyCode: "USD",
                                  FeeDescription: {
                                    Text: ["Service charge"],
                                  },
                                },
                                {
                                  Code: 36,
                                  Description: "Value Added Tax (VAT)",
                                  Amount: "19.50",
                                  CurrencyCode: "USD",
                                  FeeDescription: {
                                    Text: ["Tax"],
                                  },
                                },
                                {
                                  Code: 3,
                                  Description: "City / Municipal Tax",
                                  Amount: "2.99",
                                  CurrencyCode: "USD",
                                  FeeDescription: {
                                    Text: ["City tax"],
                                  },
                                },
                              ],
                            },
                          },
                          CancelPenalties: {
                            CancelPenalty: [
                              {
                                Refundable: true,
                              },
                            ],
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
            RateUnavailability: {
              RateSource: [
                {
                  Source: "100",
                  Reason: "Hotel not found",
                  DisplayMessage: "Hotel permanently closed",
                },
              ],
            },
          },
        },
        {
          HotelInfo: {
            HotelCode: "100132500",
            CodeContext: "GLOBAL",
            HotelName:
              "Americas Best Value Inn And Suites Arlington/grand Prairie",
            ChainCode: "BV",
            ChainName: "AmericasBestValue",
            BrandCode: "10000",
            BrandName: "undefined",
            Distance: 1.22,
            Direction: "NE",
            UOM: "MI",
            SabreRating: "2.0",
            Ordinal: 2,
            SabreHotelCode: "7161",
            CanReturnRequestedNegotiatedRate: false,
            LocationInfo: {
              Latitude: "32.767915",
              Longitude: "-97.062527",
              Address: {
                AddressLine1: "1108 North Highway 360",
                CityName: {
                  CityCode: "DFW",
                  value: "Grand Prairie",
                },
                StateProv: {
                  StateCode: "TX",
                  value: "",
                },
                PostalCode: "75050",
                CountryName: {
                  Code: "US",
                  value: "United States of America",
                },
              },
              Contact: {
                Phone: "1-972-9750000",
                Fax: "1-972-975 3033",
              },
            },
            Amenities: {
              Amenity: [
                {
                  Code: 168,
                  Description: "Onsite laundry",
                  ComplimentaryInd: false,
                  value: "Guest laundromat",
                },
                {
                  Code: 2002,
                  Description: "Stay Safe",
                  value: "",
                },
                {
                  Code: 2004,
                  Description: "Local Calls",
                  value: "Complimentary",
                },
                {
                  Code: 2016,
                  Description: "Rollaway adult",
                  value: "",
                },
                {
                  Code: 2017,
                  Description: "Crib charge",
                  value: "",
                },
                {
                  Code: 2018,
                  Description: "Extra person",
                  value: "",
                },
                {
                  Code: 227,
                  Description: "Complimentary breakfast",
                  value: "",
                },
                {
                  Code: 259,
                  Description: "High speed internet access",
                  value: "",
                },
                {
                  Code: 68,
                  Description: "Parking",
                  value: "Y-ON SITE",
                },
                {
                  Code: 42,
                  Description: "Free Parking",
                  value: "",
                },
              ],
            },
            PropertyQualityInfo: {
              PropertyQuality: [
                {
                  Code: 6,
                  Description: "Economy",
                },
              ],
            },
          },
          HotelRateInfo: {
            RateInfos: {
              ConvertedRateInfo: [
                {
                  StartDate: "2025-02-21",
                  EndDate: "2025-02-23",
                  AmountBeforeTax: "124.65",
                  AmountAfterTax: "150.31",
                  AverageNightlyRate: "75.16",
                  AverageNightlyRateBeforeTax: "62.33",
                  HighestNightlyRate: "63.24",
                  ApproxTotalPrice: "150.31",
                  CurrencyCode: "USD",
                  AdditionalFeesInclusive: false,
                  TaxInclusive: true,
                  RateSource: "110",
                  RateKey:
                    "ReY9ZtihvHSgURIP1cNjUAbnks0Yob5Jvwfxg57VqjbHR8vEpbXR3KIA8nabdhpgMRbNSw+AWzfQoMvnMY5qedrRRXyVcLDfjHuRVJxmgPp2Dk6OygVzeFytD4mTyYfpfI7A7J9UfP5DPqkupcjmVZN2cMYy6ZXUd8+Npr9Xc59Sb8qX/osCwFdKxTFajIWabHNaVIOsT/T/WrXB4OYma1ANwcm+tnmv+l9rlck1nsoMYLCGKxyc3R4eDXNrQkqXv5fNhcMdUZlKDg0JbOi95SyZSHgYA1+E3H0DBjXuMziNAcb+jg3yc6XthMMwN98BiXCJiU1OwmAshj7EDgrUtTxZ9Z9OYpv4EQ4SCwfPOgt9HnJ4DGeIaE4FgtgqneeE2F7HZi+jWFttSvvsxhG3+N+FAUTv6MTogOfELkEIvPSQYTuWtH+9fFQj9hHZXf/knI5gDCeSFWtDMusL2N968m7UmnYzug0sQkOG+JtoAK+7zzPUlcfq3Bncec8tFWWd08gotxO0iEHCoTvKIfcghTYQC2ECK4o2LWVavKIpeTqhBZSZoarN9B5y/2Z9Dd8jFZ9ucLsprnlvdQSVqz3Oa42kFiI3DBZoT7M8/NExC3S3Hcmc/gsqdNoE6UQa5gtg79Q8yWZmbQep0SWfT3euHIS18VBNMxf1lCmOVVirJoO+4tWmGbChxf7vMHpubsonTSjDmbDSVYvduSVQP9+0nYz4Vq48oukRs6+m+WRYJXWsOUTj6l3Rdlruvpg8JlVD1ZnKIPssVF45byb/ukKIKXcnoM55eswAFmcxvW+11HL1zV4Jb6B7Tm+bBoTrISw4lWjcHyz5DCZp2Ea9tNvVSQgpVX1/CfrZGD0Immi53/jjwJhiiSTfEKQWkJvX5D/hGoj7In+59yK2XwgZ8YgYe6teBw6LczVA5Va8z0SzQxnt2Bd9qU/eM20Arh0iF160S4rHbDWo1XlQeE/exFK7UuNSo8eDrqGqE2yIF4Jq0tEQz+Kb3rkaf8vWuUcjt7kCv04xr6jcl73uvGc1Z5tbKfl/nH/38cHJrhuLPqf27pC5Grb1I4uTYwR753cCtD0MEAFHwfmLH1wklsvyMB5ICQ==",
                  Commission: {
                    Amount: "1.07",
                    CurrencyCode: "USD",
                    Type: "Amount",
                  },
                },
                {
                  StartDate: "2025-02-21",
                  EndDate: "2025-02-23",
                  AmountBeforeTax: "146.65",
                  AmountAfterTax: "146.65",
                  AverageNightlyRate: "73.32",
                  AverageNightlyRateBeforeTax: "73.33",
                  HighestNightlyRate: "73.33",
                  ApproxTotalPrice: "168.65",
                  CurrencyCode: "USD",
                  AdditionalFeesInclusive: false,
                  TaxInclusive: true,
                  RateSource: "113",
                  RateKey:
                    "1WdeOslhgtn12F86kSumUgbG8LoyPZiWooEc4+JsiUB3ygBd2r7Md9CFjnX6SnIBbDtkQf6PT9XAoemoOfc7i801dj5bjRvzqv6pdzYSAZWRswMmXHAr4loXLCL5LHuexTtICiC/Pwi3gfA9BIeiPF3eHR4bLIptm1xJc2k+Sxvq9qn9B+olKdlhIsKNSvHQK6PQhn8Ievw1T2WwKaoTN8g726/Zz4qBEJG5SttzyzjLCAVnoLXkOJyz3ocolCe8myEN2PKpPWG75uoVt87NHzbTtCcIHYXUTTEKYnQ4zBz2LASgtsBN0PNYfVi5UDXGZQagvvcpoh7TrD1FEsEOqJ/L1mXHwIgBwH7hU+SEVD2pl21oWVKhxlLcgZOgVyTjBbSp3M6CRIAsBtxR0xAiVZDjDRFYSdPJaODEdFjnuNEc0GgT3xxXiQmBZUW4+o8U5v+pdLgjWyjbovep3p9BSuKe1CzUtEuAIIu/HBQYp/FCHw52UXV6YcrNdFFOVYLqLACS0p3WhyV7Wkgjhay1umN9omgZlKK2SSMofR9/GaY=",
                },
                {
                  StartDate: "2025-02-21",
                  EndDate: "2025-02-23",
                  AmountBeforeTax: "162.49",
                  AmountAfterTax: "183.41",
                  AverageNightlyRate: "91.71",
                  AverageNightlyRateBeforeTax: "81.25",
                  HighestNightlyRate: "81.25",
                  ApproxTotalPrice: "183.41",
                  CurrencyCode: "USD",
                  TaxInclusive: true,
                  RateSource: "204",
                  RateKey:
                    "kaPGE3+B3L+0M/WlW5EC1mdiCBeS1doiWNd/9i2LmaTKEQL+56CCnTK1bxxSt18W2QqFtKQOKGo64dBrVMdCQ4mBegwhtHpYvrbi4Ix6/TY2OWaDCgAt2BlVN3rvXW0TL84/VTnNd/V34DAdPxj5VfKXVMu+RVQCiMnSdAtk+wvCJNOWZuBM4qcTCO9rGaOHmKN8iu54n+BtBNssTIewcEugKzMPe/danW6c/197sJ6ikh4f6Yq0zckdKbHb6pJfOLpnjES+WsReFCVIO5dLeADtmzl/bijFBgbtAmt2fMzA8QRsdE3UgN/vVBpH//J75y6Gj/FtVolgrVz+EB1dA7wWeJ4CVv7wUxjOMutqOmbfymY5VJFhkUgBgPj6waP53SR5tettIRNGlN0Ft2lAR+whkMNLPOKTdQee2/5eT9UWX3ERrIzcYlmetU+n4yUwXidBa3PACj5JDAz9PWu8MmhE0JO/16kHdGXTsUe0Zbv1cQw5CTed2XFo3VIoWy4xCOhKg9LmqqSaqi2nxZeWixkC0t29pL+G4sCjDG5rOnY=",
                  Commission: {
                    Percent: 0,
                    Type: "None",
                  },
                },
              ],
            },
            Rooms: {
              Room: [
                {
                  RoomIndex: 1,
                  Adults: 1,
                  Children: 1,
                  BedTypeOptions: {
                    BedTypes: [
                      {
                        BedType: [
                          {
                            Code: 1,
                            Description: "Double",
                          },
                        ],
                      },
                    ],
                  },
                  RoomDescription: {
                    Name: "Room, 1 Double Bed, Accessible, Smoking",
                    Text: ["Room, 1 Double Bed, Accessible, Smoking"],
                  },
                  Amenities: {
                    Amenity: [
                      {
                        Code: 101,
                        Description: "Smoking",
                        value: "",
                      },
                    ],
                  },
                  RatePlans: {
                    RatePlan: [
                      {
                        RatePlanName: "Room, 1 Double Bed, Accessible, Smoking",
                        RatePlanType: "13",
                        RatePlanTypeDescription: "Regular/rack",
                        PrepaidIndicator: true,
                        AvailableQuantity: 2,
                        RateSource: "110",
                        RateKey:
                          "ReY9ZtihvHSgURIP1cNjUAbnks0Yob5Jvwfxg57VqjbHR8vEpbXR3KIA8nabdhpgMRbNSw+AWzfQoMvnMY5qedrRRXyVcLDfjHuRVJxmgPp2Dk6OygVzeFytD4mTyYfpfI7A7J9UfP5DPqkupcjmVZN2cMYy6ZXUd8+Npr9Xc59Sb8qX/osCwFdKxTFajIWabHNaVIOsT/T/WrXB4OYma1ANwcm+tnmv+l9rlck1nsoMYLCGKxyc3R4eDXNrQkqXv5fNhcMdUZlKDg0JbOi95SyZSHgYA1+E3H0DBjXuMziNAcb+jg3yc6XthMMwN98BiXCJiU1OwmAshj7EDgrUtTxZ9Z9OYpv4EQ4SCwfPOgt9HnJ4DGeIaE4FgtgqneeE2F7HZi+jWFttSvvsxhG3+N+FAUTv6MTogOfELkEIvPSQYTuWtH+9fFQj9hHZXf/knI5gDCeSFWtDMusL2N968m7UmnYzug0sQkOG+JtoAK+7zzPUlcfq3Bncec8tFWWd08gotxO0iEHCoTvKIfcghTYQC2ECK4o2LWVavKIpeTqhBZSZoarN9B5y/2Z9Dd8jFZ9ucLsprnlvdQSVqz3Oa42kFiI3DBZoT7M8/NExC3S3Hcmc/gsqdNoE6UQa5gtg79Q8yWZmbQep0SWfT3euHIS18VBNMxf1lCmOVVirJoO+4tWmGbChxf7vMHpubsonTSjDmbDSVYvduSVQP9+0nYz4Vq48oukRs6+m+WRYJXWsOUTj6l3Rdlruvpg8JlVD1ZnKIPssVF45byb/ukKIKXcnoM55eswAFmcxvW+11HL1zV4Jb6B7Tm+bBoTrISw4lWjcHyz5DCZp2Ea9tNvVSQgpVX1/CfrZGD0Immi53/jjwJhiiSTfEKQWkJvX5D/hGoj7In+59yK2XwgZ8YgYe6teBw6LczVA5Va8z0SzQxnt2Bd9qU/eM20Arh0iF160S4rHbDWo1XlQeE/exFK7UuNSo8eDrqGqE2yIF4Jq0tEQz+Kb3rkaf8vWuUcjt7kCv04xr6jcl73uvGc1Z5tbKfl/nH/38cHJrhuLPqf27pC5Grb1I4uTYwR753cCtD0MEAFHwfmLH1wklsvyMB5ICQ==",
                        LoyaltyPoints: false,
                        RatePlanDescription: {
                          Text: ["Room, 1 Double Bed, Accessible, Smoking"],
                        },
                        RatePlanInclusions: {
                          RatePlanInclusion: [
                            {
                              Description: "Free parking",
                              Code: 42,
                            },
                            {
                              Description: "Complimentary wireless internet",
                              Code: 286,
                            },
                          ],
                        },
                        ConvertedRateInfo: {
                          StartDate: "2025-02-21",
                          EndDate: "2025-02-23",
                          AmountBeforeTax: "124.65",
                          AmountAfterTax: "150.31",
                          AverageNightlyRate: "75.16",
                          AverageNightlyRateBeforeTax: "62.33",
                          HighestNightlyRate: "63.24",
                          ApproxTotalPrice: "150.31",
                          CurrencyCode: "USD",
                          AdditionalFeesInclusive: false,
                          TaxInclusive: true,
                          Rates: {
                            Rate: [
                              {
                                StartDate: "2025-02-21",
                                EndDate: "2025-02-22",
                                AmountBeforeTax: "61.41",
                                AmountAfterTax: "74.05",
                                CurrencyCode: "USD",
                              },
                              {
                                StartDate: "2025-02-22",
                                EndDate: "2025-02-23",
                                AmountBeforeTax: "63.24",
                                AmountAfterTax: "76.26",
                                CurrencyCode: "USD",
                              },
                            ],
                          },
                          Taxes: {
                            Amount: "25.66",
                            CurrencyCode: "USD",
                            Tax: [
                              {
                                StartDate: "2025-02-21",
                                EndDate: "2025-02-22",
                                Amount: "12.64",
                                CurrencyCode: "USD",
                              },
                              {
                                StartDate: "2025-02-22",
                                EndDate: "2025-02-23",
                                Amount: "13.02",
                                CurrencyCode: "USD",
                              },
                            ],
                            TaxGroups: {
                              TaxGroup: [
                                {
                                  Code: 201,
                                  Description:
                                    "Tax Recovery Charges and Service Fees",
                                  Amount: "25.66",
                                  CurrencyCode: "USD",
                                  TaxDescription: {
                                    Text: [
                                      "Tax Recovery Charges and Service Fees",
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                          CancelPenalties: {
                            CancelPenalty: [
                              {
                                Refundable: false,
                              },
                            ],
                          },
                          Guarantee: {
                            GuaranteeType: "DEP",
                            GuaranteesAccepted: {
                              GuaranteeAccepted: [
                                {
                                  GuaranteeTypeCode: 5,
                                  GuaranteeTypeDescription: "Credit card",
                                },
                              ],
                            },
                          },
                        },
                      },
                    ],
                  },
                },
                {
                  RoomIndex: 1,
                  RoomType: "Suite",
                  RoomTypeCode: 3,
                  Adults: 1,
                  Children: 1,
                  RoomDescription: {
                    Text: ["King Suite - Non-Smoking"],
                  },
                  RatePlans: {
                    RatePlan: [
                      {
                        RatePlanName: "King Suite - Non-Smoking",
                        RatePlanType: "13",
                        RatePlanTypeDescription: "Regular/rack",
                        PrepaidIndicator: false,
                        AvailableQuantity: 5,
                        RateSource: "113",
                        RateKey:
                          "1WdeOslhgtn12F86kSumUgbG8LoyPZiWooEc4+JsiUB3ygBd2r7Md9CFjnX6SnIBbDtkQf6PT9XAoemoOfc7i801dj5bjRvzqv6pdzYSAZWRswMmXHAr4loXLCL5LHuexTtICiC/Pwi3gfA9BIeiPF3eHR4bLIptm1xJc2k+Sxvq9qn9B+olKdlhIsKNSvHQK6PQhn8Ievw1T2WwKaoTN8g726/Zz4qBEJG5SttzyzjLCAVnoLXkOJyz3ocolCe8myEN2PKpPWG75uoVt87NHzbTtCcIHYXUTTEKYnQ4zBz2LASgtsBN0PNYfVi5UDXGZQagvvcpoh7TrD1FEsEOqJ/L1mXHwIgBwH7hU+SEVD2pl21oWVKhxlLcgZOgVyTjBbSp3M6CRIAsBtxR0xAiVZDjDRFYSdPJaODEdFjnuNEc0GgT3xxXiQmBZUW4+o8U5v+pdLgjWyjbovep3p9BSuKe1CzUtEuAIIu/HBQYp/FCHw52UXV6YcrNdFFOVYLqLACS0p3WhyV7Wkgjhay1umN9omgZlKK2SSMofR9/GaY=",
                        LoyaltyPoints: false,
                        RatePlanDescription: {
                          Text: ["King Suite - Non-Smoking"],
                        },
                        ConvertedRateInfo: {
                          StartDate: "2025-02-21",
                          EndDate: "2025-02-23",
                          AmountBeforeTax: "146.65",
                          AmountAfterTax: "146.65",
                          AverageNightlyRate: "73.32",
                          AverageNightlyRateBeforeTax: "73.33",
                          HighestNightlyRate: "73.33",
                          ApproxTotalPrice: "168.65",
                          CurrencyCode: "USD",
                          AdditionalFeesInclusive: false,
                          TaxInclusive: true,
                          Fees: {
                            Amount: "22.00",
                            CurrencyCode: "USD",
                            FeeGroups: {
                              FeeGroup: [
                                {
                                  Code: 36,
                                  Description: "Value Added Tax (VAT)",
                                  Amount: "22.00",
                                  CurrencyCode: "USD",
                                  FeeDescription: {
                                    Text: ["Tax"],
                                  },
                                },
                              ],
                            },
                          },
                          CancelPenalties: {
                            CancelPenalty: [
                              {
                                Refundable: true,
                              },
                            ],
                          },
                        },
                      },
                    ],
                  },
                },
                {
                  RoomIndex: 1,
                  NonSmoking: true,
                  Adults: 1,
                  Children: 1,
                  RoomDescription: {
                    Text: ["Standard Room, 1 King Bed, Non Smoking"],
                  },
                  Occupancy: {
                    Max: 2,
                  },
                  RatePlans: {
                    RatePlan: [
                      {
                        RatePlanName: "Room, 1 Double Bed, Accessible, Smoking",
                        RatePlanType: "25",
                        RatePlanTypeDescription: "Net",
                        PrepaidIndicator: false,
                        RateSource: "204",
                        RateKey:
                          "kaPGE3+B3L+0M/WlW5EC1mdiCBeS1doiWNd/9i2LmaTKEQL+56CCnTK1bxxSt18W2QqFtKQOKGo64dBrVMdCQ4mBegwhtHpYvrbi4Ix6/TY2OWaDCgAt2BlVN3rvXW0TL84/VTnNd/V34DAdPxj5VfKXVMu+RVQCiMnSdAtk+wvCJNOWZuBM4qcTCO9rGaOHmKN8iu54n+BtBNssTIewcEugKzMPe/danW6c/197sJ6ikh4f6Yq0zckdKbHb6pJfOLpnjES+WsReFCVIO5dLeADtmzl/bijFBgbtAmt2fMzA8QRsdE3UgN/vVBpH//J75y6Gj/FtVolgrVz+EB1dA7wWeJ4CVv7wUxjOMutqOmbfymY5VJFhkUgBgPj6waP53SR5tettIRNGlN0Ft2lAR+whkMNLPOKTdQee2/5eT9UWX3ERrIzcYlmetU+n4yUwXidBa3PACj5JDAz9PWu8MmhE0JO/16kHdGXTsUe0Zbv1cQw5CTed2XFo3VIoWy4xCOhKg9LmqqSaqi2nxZeWixkC0t29pL+G4sCjDG5rOnY=",
                        LoyaltyPoints: false,
                        RatePlanDescription: {
                          Text: ["Room, 1 Double Bed, Accessible, Smoking"],
                        },
                        MealsIncluded: {
                          MealPlanIndicator: false,
                          MealPlanCode: 14,
                          MealPlanDescription: "Room only",
                        },
                        ConvertedRateInfo: {
                          StartDate: "2025-02-21",
                          EndDate: "2025-02-23",
                          AmountBeforeTax: "162.49",
                          AmountAfterTax: "183.41",
                          AverageNightlyRate: "91.71",
                          AverageNightlyRateBeforeTax: "81.25",
                          HighestNightlyRate: "81.25",
                          ApproxTotalPrice: "183.41",
                          CurrencyCode: "USD",
                          TaxInclusive: true,
                          Taxes: {
                            Amount: "20.92",
                            CurrencyCode: "USD",
                            Tax: [
                              {
                                StartDate: "2025-02-21",
                                EndDate: "2025-02-23",
                                Amount: "20.92",
                                CurrencyCode: "USD",
                              },
                            ],
                            TaxGroups: {
                              TaxGroup: [
                                {
                                  Code: 17,
                                  Description: "Total tax",
                                  Amount: "20.92",
                                  CurrencyCode: "USD",
                                  TaxDescription: {
                                    Text: ["Tax"],
                                  },
                                },
                              ],
                            },
                          },
                          CancelPenalties: {
                            CancelPenalty: [
                              {
                                Refundable: false,
                                PenaltyDescription: {
                                  Text: ["This rate is non-refundable."],
                                },
                              },
                            ],
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
            RateUnavailability: {
              RateSource: [
                {
                  Source: "100",
                  Reason: "Hotel not found",
                  DisplayMessage: "Hotel permanently closed",
                },
              ],
            },
          },
        },
      ],
    },
  },
};
