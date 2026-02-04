// mocks/sabre-bfm.mock.ts
// Contains:
// - Round-trip flight offer between WAW and SPU (LOT Polish Airlines)
// - One-way flight offer between LHR and FRA (British Airways)
export const MOCK_SABRE_BFM_RESPONSE = {
  groupedItineraryResponse: {
    version: "5",
    messages: [
      {
        severity: "Info",
        type: "SERVER",
        code: "GCA14-ISELL-TN-00-2024-12-01-WL5P",
        text: "27131",
      },
      {
        severity: "Info",
        type: "WORKERTHREAD",
        code: "TRANSACTIONID",
        text: "7346539295149655838",
      },
      {
        severity: "Info",
        type: "DRE",
        code: "RULEID",
        text: "18411",
      },
      {
        severity: "Info",
        type: "DEFAULT",
        code: "RULEID",
        text: "31139",
      },
    ],
    statistics: {
      itineraryCount: 2,
    },
    scheduleDescs: [
      // Round-trip WAW-SPU (LOT)
      {
        id: 1,
        frequency: "SM*W***",
        stopCount: 0,
        eTicketable: true,
        totalMilesFlown: 635,
        elapsedTime: 115,
        departure: {
          airport: "SPU",
          city: "SPU",
          country: "HR",
          time: "17:10:00+02:00",
        },
        arrival: {
          airport: "WAW",
          city: "WAW",
          country: "PL",
          time: "19:05:00+02:00",
        },
        carrier: {
          marketing: "LO",
          marketingFlightNumber: 576,
          operating: "LO",
          operatingFlightNumber: 576,
          equipment: {
            code: "E75",
            typeForFirstLeg: "N",
            typeForLastLeg: "N",
          },
        },
      },
      {
        id: 2,
        frequency: "SM*W***",
        stopCount: 0,
        eTicketable: true,
        totalMilesFlown: 635,
        elapsedTime: 120,
        departure: {
          airport: "WAW",
          city: "WAW",
          country: "PL",
          time: "14:20:00+02:00",
        },
        arrival: {
          airport: "SPU",
          city: "SPU",
          country: "HR",
          time: "16:20:00+02:00",
        },
        carrier: {
          marketing: "LO",
          marketingFlightNumber: 575,
          operating: "LO",
          operatingFlightNumber: 575,
          equipment: {
            code: "E75",
            typeForFirstLeg: "N",
            typeForLastLeg: "N",
          },
        },
      },
      // One-way LHR-FRA (British Airways)
      {
        id: 3,
        frequency: "*****F*",
        stopCount: 0,
        eTicketable: true,
        totalMilesFlown: 408,
        elapsedTime: 95,
        departure: {
          airport: "LHR",
          city: "LON",
          country: "GB",
          time: "06:55:00+01:00",
          terminal: "5",
        },
        arrival: {
          airport: "FRA",
          city: "FRA",
          country: "DE",
          time: "09:30:00+02:00",
          terminal: "2",
        },
        carrier: {
          marketing: "BA",
          marketingFlightNumber: 902,
          operating: "BA",
          operatingFlightNumber: 902,
          alliances: "OW ",
          equipment: {
            code: "320",
            typeForFirstLeg: "N",
            typeForLastLeg: "N",
          },
        },
      },
    ],
    taxDescs: [
      // LOT taxes (WAW-SPU round-trip)
      {
        id: 1,
        code: "YQF",
        amount: 16.3,
        currency: "USD",
        description: "SERVICE FEE - CARRIER-IMPOSED FUEL",
        publishedAmount: 15,
        publishedCurrency: "EUR",
        station: "WAW",
      },
      {
        id: 2,
        code: "YQF",
        amount: 16.3,
        currency: "USD",
        description: "SERVICE FEE - CARRIER-IMPOSED FUEL",
        publishedAmount: 15,
        publishedCurrency: "EUR",
        station: "SPU",
      },
      {
        id: 3,
        code: "XW",
        amount: 21.5,
        currency: "USD",
        description: "AIRPORT TAX",
        publishedAmount: 86.69,
        publishedCurrency: "PLN",
        station: "WAW",
        country: "PL",
      },
      {
        id: 4,
        code: "ND",
        amount: 0.4,
        currency: "USD",
        description: "PASSENGER SERVICE CHARGE DEPARTURES",
        publishedAmount: 1.43,
        publishedCurrency: "PLN",
        station: "WAW",
        country: "PL",
      },
      {
        id: 5,
        code: "HR",
        amount: 17.8,
        currency: "USD",
        description: "PASSENGER SERVICE AND SECURITY CHARGE",
        publishedAmount: 16.4,
        publishedCurrency: "EUR",
        station: "SPU",
        country: "HR",
      },
      {
        id: 6,
        code: "MI",
        amount: 1.5,
        currency: "USD",
        description: "CIVIL AVIATION AUTHORITY  CCAA  TAX",
        publishedAmount: 1.37,
        publishedCurrency: "EUR",
        station: "SPU",
        country: "HR",
      },
      // BA taxes (LHR-FRA one-way)
      {
        id: 7,
        code: "UB",
        amount: 30.4,
        currency: "USD",
        description: "PASSENGER SERVICE CHARGE DEPARTURES",
        publishedAmount: 23.05,
        publishedCurrency: "GBP",
        station: "LHR",
        country: "GB",
      },
      {
        id: 8,
        code: "YQI",
        amount: 3.3,
        currency: "USD",
        description: "SERVICE FEE - CARRIER-IMPOSED MISC",
        publishedAmount: 2.5,
        publishedCurrency: "GBP",
        station: "LHR",
      },
      {
        id: 9,
        code: "GB",
        amount: 19.8,
        currency: "USD",
        description: "AIR PASSENGER DUTY APD",
        publishedAmount: 15,
        publishedCurrency: "GBP",
        station: "LHR",
        country: "GB",
      },
      {
        id: 10,
        code: "YRI",
        amount: 2,
        currency: "USD",
        description: "SERVICE FEE - CARRIER-IMPOSED MISC",
        publishedAmount: 1.5,
        publishedCurrency: "GBP",
        station: "LHR",
      },
    ],
    taxSummaryDescs: [
      // LOT tax summaries
      {
        id: 1,
        code: "XW",
        amount: 21.5,
        currency: "USD",
        description: "AIRPORT TAX",
        publishedAmount: 86.69,
        publishedCurrency: "PLN",
        station: "WAW",
        country: "PL",
      },
      {
        id: 2,
        code: "ND",
        amount: 0.4,
        currency: "USD",
        description: "PASSENGER SERVICE CHARGE DEPARTURES",
        publishedAmount: 1.43,
        publishedCurrency: "PLN",
        station: "WAW",
        country: "PL",
      },
      {
        id: 3,
        code: "HR",
        amount: 17.8,
        currency: "USD",
        description: "PASSENGER SERVICE AND SECURITY CHARGE",
        publishedAmount: 16.4,
        publishedCurrency: "EUR",
        station: "SPU",
        country: "HR",
      },
      {
        id: 4,
        code: "MI",
        amount: 1.5,
        currency: "USD",
        description: "CIVIL AVIATION AUTHORITY  CCAA  TAX",
        publishedAmount: 1.37,
        publishedCurrency: "EUR",
        station: "SPU",
        country: "HR",
      },
      {
        id: 5,
        code: "YQ",
        amount: 32.6,
        currency: "USD",
        description: "YQ taxes summary",
      },
      // BA tax summaries
      {
        id: 6,
        code: "UB",
        amount: 30.4,
        currency: "USD",
        description: "PASSENGER SERVICE CHARGE DEPARTURES",
        publishedAmount: 23.05,
        publishedCurrency: "GBP",
        station: "LHR",
        country: "GB",
      },
      {
        id: 7,
        code: "YQI",
        amount: 3.3,
        currency: "USD",
        description: "SERVICE FEE - CARRIER-IMPOSED MISC",
        publishedAmount: 2.5,
        publishedCurrency: "GBP",
        station: "LHR",
      },
      {
        id: 8,
        code: "GB",
        amount: 19.8,
        currency: "USD",
        description: "AIR PASSENGER DUTY APD",
        publishedAmount: 15,
        publishedCurrency: "GBP",
        station: "LHR",
        country: "GB",
      },
      {
        id: 9,
        code: "YRI",
        amount: 2,
        currency: "USD",
        description: "SERVICE FEE - CARRIER-IMPOSED MISC",
        publishedAmount: 1.5,
        publishedCurrency: "GBP",
        station: "LHR",
      },
    ],
    obFeeDescs: [
      {
        id: 1,
        amount: 0,
        currency: "USD",
      },
    ],
    fareComponentDescs: [
      // LOT fare components (round-trip)
      {
        id: 1,
        governingCarrier: "LO",
        fareAmount: 26.86,
        fareCurrency: "NUC",
        fareBasisCode: "OSAVI5",
        farePassengerType: "ADT",
        publishedFareAmount: 235,
        publishedFareCurrency: "PLN",
        directionality: "FROM",
        applicablePricingCategories: "4 5 6 7 8 9 10 15 16 17 31 33",
        vendorCode: "ATP",
        fareTypeBitmap: "00",
        fareType: "XPN",
        fareTariff: "21",
        fareRule: "SAV1",
        cabinCode: "Y",
        segments: [
          {
            segment: {
              stopover: true,
            },
          },
        ],
      },
      {
        id: 2,
        governingCarrier: "LO",
        fareAmount: 26.86,
        fareCurrency: "NUC",
        fareBasisCode: "OSAVI5",
        farePassengerType: "ADT",
        publishedFareAmount: 235,
        publishedFareCurrency: "PLN",
        directionality: "TO",
        applicablePricingCategories: "4 5 6 7 8 9 10 15 16 17 31 33",
        vendorCode: "ATP",
        fareTypeBitmap: "00",
        fareType: "XPN",
        fareTariff: "21",
        fareRule: "SAV1",
        cabinCode: "Y",
        segments: [
          {
            segment: {
              stopover: true,
            },
          },
        ],
      },
      // BA fare component (one-way)
      {
        id: 3,
        governingCarrier: "BA",
        fareAmount: 12.08,
        fareCurrency: "NUC",
        fareBasisCode: "VTEST/ROBB",
        farePassengerType: "ADT",
        ticketDesignator: "ROBB",
        publishedFareAmount: 9,
        publishedFareCurrency: "GBP",
        mileageSurcharge: 0,
        mileage: true,
        oneWayFare: true,
        negotiatedFare: true,
        privateFare: true,
        directionality: "FROM",
        direction: "EH",
        notValidAfter: "2027-09-11",
        applicablePricingCategories: "10 25 35",
        vendorCode: "ATP",
        fareTypeBitmap: "0E",
        fareType: "ER",
        fareTariff: "930",
        fareRule: "XX23",
        cabinCode: "Y",
        segments: [
          {
            segment: {},
          },
        ],
      },
    ],
    validatingCarrierDescs: [
      {
        id: 1,
        settlementMethod: "ARC",
        newVcxProcess: true,
        default: {
          code: "LO",
        },
        carrierName: "LOT Polish Airlines",
        carrier: "LO",
      },
      {
        id: 2,
        settlementMethod: "ARC",
        newVcxProcess: true,
        default: {
          code: "BA",
        },
        carrierName: "British Airways",
        carrier: "BA",
      },
    ],
    baggageAllowanceDescs: [
      {
        id: 1,
        pieceCount: 0,
      },
      {
        id: 2,
        pieceCount: 1,
      },
    ],
    legDescs: [
      // LOT legs (round-trip)
      {
        id: 1,
        elapsedTime: 115,
        schedules: [
          {
            ref: 1,
          },
        ],
      },
      {
        id: 2,
        elapsedTime: 120,
        schedules: [
          {
            ref: 2,
          },
        ],
      },
      // BA leg (one-way)
      {
        id: 3,
        elapsedTime: 95,
        schedules: [
          {
            ref: 3,
          },
        ],
      },
    ],
    itineraryGroups: [
      // LOT round-trip WAW-SPU
      {
        groupDescription: {
          legDescriptions: [
            {
              departureDate: "2024-09-11",
              departureLocation: "WAW",
              arrivalLocation: "SPU",
            },
            {
              departureDate: "2024-09-18",
              departureLocation: "SPU",
              arrivalLocation: "WAW",
            },
          ],
        },
        itineraries: [
          {
            id: 1,
            pricingSource: "ADVJR1",
            legs: [
              {
                ref: 2,
              },
              {
                ref: 1,
              },
            ],
            pricingInformation: [
              {
                pricingSubsource: "HPIS",
                fare: {
                  mandatoryInd: true,
                  validatingCarrierCode: "LO",
                  vita: true,
                  eTicketable: true,
                  lastTicketDate: "2024-11-21",
                  lastTicketTime: "12:29",
                  governingCarriers: "LO LO",
                  passengerInfoList: [
                    {
                      passengerInfo: {
                        passengerType: "ADT",
                        passengerNumber: 1,
                        nonRefundable: true,
                        fareComponents: [
                          {
                            ref: 1,
                            beginAirport: "WAW",
                            endAirport: "SPU",
                            segments: [
                              {
                                segment: {
                                  bookingCode: "O",
                                  cabinCode: "Y",
                                  mealCode: "RF",
                                  seatsAvailable: 9,
                                  availabilityBreak: true,
                                },
                              },
                            ],
                          },
                          {
                            ref: 2,
                            beginAirport: "SPU",
                            endAirport: "WAW",
                            segments: [
                              {
                                segment: {
                                  bookingCode: "O",
                                  cabinCode: "Y",
                                  mealCode: "RF",
                                  seatsAvailable: 9,
                                  availabilityBreak: true,
                                },
                              },
                            ],
                          },
                        ],
                        taxes: [
                          {
                            ref: 5,
                          },
                          {
                            ref: 6,
                          },
                          {
                            ref: 4,
                          },
                          {
                            ref: 3,
                          },
                          {
                            ref: 1,
                          },
                          {
                            ref: 2,
                          },
                        ],
                        taxSummaries: [
                          {
                            ref: 3,
                          },
                          {
                            ref: 4,
                          },
                          {
                            ref: 2,
                          },
                          {
                            ref: 1,
                          },
                          {
                            ref: 5,
                          },
                        ],
                        obFees: [
                          {
                            ref: 1,
                          },
                        ],
                        currencyConversion: {
                          from: "PLN",
                          to: "USD",
                          exchangeRateUsed: 0.2475903,
                        },
                        passengerTotalFare: {
                          totalFare: 131.8,
                          totalTaxAmount: 73.8,
                          currency: "USD",
                          baseFareAmount: 235,
                          baseFareCurrency: "PLN",
                          equivalentAmount: 58,
                          equivalentCurrency: "USD",
                          constructionAmount: 53.72,
                          constructionCurrency: "NUC",
                          exchangeRateOne: 4.372975,
                        },
                        baggageInformation: [
                          {
                            provisionType: "A",
                            airlineCode: "LO",
                            segments: [
                              {
                                id: 0,
                              },
                            ],
                            allowance: {
                              ref: 1,
                            },
                          },
                          {
                            provisionType: "A",
                            airlineCode: "LO",
                            segments: [
                              {
                                id: 1,
                              },
                            ],
                            allowance: {
                              ref: 1,
                            },
                          },
                        ],
                      },
                    },
                  ],
                  totalFare: {
                    totalPrice: 131.8,
                    totalTaxAmount: 73.8,
                    currency: "USD",
                    baseFareAmount: 235,
                    baseFareCurrency: "PLN",
                    constructionAmount: 53.72,
                    constructionCurrency: "NUC",
                    equivalentAmount: 58,
                    equivalentCurrency: "USD",
                  },
                  validatingCarriers: [
                    {
                      ref: 1,
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
      // BA one-way LHR-FRA
      {
        groupDescription: {
          legDescriptions: [
            {
              departureDate: "2026-09-11",
              departureLocation: "LHR",
              arrivalLocation: "FRA",
            },
          ],
        },
        itineraries: [
          {
            id: 2,
            pricingSource: "WPNI1_ITIN",
            legs: [
              {
                ref: 3,
              },
            ],
            pricingInformation: [
              {
                pricingSubsource: "MIP",
                distributionModel: "ATPCO",
                fare: {
                  validatingCarrierCode: "BA",
                  vita: true,
                  eTicketable: true,
                  lastTicketDate: "2026-09-11",
                  lastTicketTime: "00:55",
                  governingCarriers: "BA",
                  passengerInfoList: [
                    {
                      passengerInfo: {
                        passengerType: "ADT",
                        passengerNumber: 1,
                        nonRefundable: false,
                        fareComponents: [
                          {
                            ref: 3,
                            beginAirport: "LHR",
                            endAirport: "FRA",
                            segments: [
                              {
                                segment: {
                                  bookingCode: "V",
                                  cabinCode: "Y",
                                  mealCode: "G",
                                  seatsAvailable: 9,
                                  availabilityBreak: true,
                                  fareBreakPoint: true,
                                },
                              },
                            ],
                          },
                        ],
                        taxes: [
                          {
                            ref: 8,
                          },
                          {
                            ref: 10,
                          },
                          {
                            ref: 9,
                          },
                          {
                            ref: 7,
                          },
                        ],
                        taxSummaries: [
                          {
                            ref: 7,
                          },
                          {
                            ref: 9,
                          },
                          {
                            ref: 8,
                          },
                          {
                            ref: 6,
                          },
                        ],
                        obFees: [
                          {
                            ref: 1,
                          },
                        ],
                        currencyConversion: {
                          from: "GBP",
                          to: "USD",
                          exchangeRateUsed: 1.31791092,
                        },
                        fareMessages: [
                          {
                            type: "W",
                            code: "0",
                            info: "PRIVATE FARE APPLIED - CHECK RULES FOR CORRECT TICKETING",
                          },
                          {
                            type: "W",
                            code: "0",
                            info: "VALIDATING CARRIER - BA",
                          },
                        ],
                        passengerTotalFare: {
                          totalFare: 67.5,
                          totalTaxAmount: 55.5,
                          currency: "USD",
                          baseFareAmount: 9,
                          baseFareCurrency: "GBP",
                          equivalentAmount: 12,
                          equivalentCurrency: "USD",
                          constructionAmount: 12.08,
                          constructionCurrency: "NUC",
                          commissionPercentage: 3,
                          commissionAmount: 0.36,
                          exchangeRateOne: 0.744929,
                          cat35CommissionPercentage: 3,
                          cat35CommissionAmount: 0.36,
                          cat35MarkupAmount: 0,
                          commissionAmountInEquivalent: 0.36,
                          commissionSource: "C",
                        },
                        baggageInformation: [
                          {
                            provisionType: "A",
                            airlineCode: "BA",
                            segments: [
                              {
                                id: 0,
                              },
                            ],
                            allowance: {
                              ref: 2,
                            },
                          },
                        ],
                        fareCalcLine: {
                          info: "LON BA FRA12.08NUC12.08END ROE0.744929",
                        },
                      },
                    },
                  ],
                  totalFare: {
                    totalPrice: 67.5,
                    totalTaxAmount: 55.5,
                    currency: "USD",
                    baseFareAmount: 9,
                    baseFareCurrency: "GBP",
                    constructionAmount: 12.08,
                    constructionCurrency: "NUC",
                    equivalentAmount: 12,
                    equivalentCurrency: "USD",
                  },
                  validatingCarriers: [
                    {
                      ref: 2,
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    ],
  },
};
