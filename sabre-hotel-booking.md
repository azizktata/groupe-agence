# Sabre Lodging API: Technical Reference

The following sequence represents the industry-standard "Shopping" flow for hotel integration.

## 📋 1. Get Hotel List API

The `GetHotelListRQ` is your primary tool for retrieving property metadata. It supports two main modes: **Discovery** (filtering by criteria) and **Specific** (fetching info for known IDs).

POST /v4.1.0/get/hotellist

### A. Discovery Mode (Search by Criteria)

Use this when you don't have Hotel IDs yet. Note that `HotelPref` becomes **mandatory** if `HotelRefs` is empty.

**Request Example:**

**JSON**

```
{
  "GetHotelListRQ": {
    "POS": {
      "Source": {
        "PseudoCityCode": "TM61"
      }
    },
    "CorporateNumber": "DK44391RC",
    "HotelPref": {
      "ChainCodes": { "ChainCode": ["HY"] },
      "SabreRating": { "Min": "4.5", "Max": "5.0" },
      "AmenityCodes": {
        "Inclusive": false,
        "AmenityCode": [
          15,
          16
        ]
      },
      "SecurityFeatureCodes": {
        "Inclusive": false,
        "SecurityFeatureCode": [
          15
        ]
      },
      "PropertyTypeCodes": {
        "Inclusive": false,
        "PropertyTypeCode": [
          15,
          16
        ]
      },
      "PropertyQualityCodes": {
        "Inclusive": false,
        "PropertyQualityCode": [
          15,
          16
        ]
      },
      "HotelName": "Resort"
    }
  }
}
```

what you can use to filter your "Discovery" results:

| **Property**                 | **Type** | **How to use it**                                             |
| ---------------------------------- | -------------- | ------------------------------------------------------------------- |
| **`HotelName`**            | String         | Find hotels containing a string (e.g., "Sheraton").*Min 3 chars.* |
| **`ChainCodes`**           | Array          | Filter by 2-letter codes (e.g.,`["HL", "HY"]`).                   |
| **`AmenityCodes`**         | Array          | Show only hotels with "WiFi" (179) or "Pool" (71).                  |
| **`SabreRating`**          | Object         | Use `Min`and `Max`(e.g.,`4.0`to `5.0`).                     |
| **`PropertyTypeCodes`**    | Array          | Filter for "Resort", "Apartment", or "Hotel".                       |
| **`PropertyQualityCodes`** | Array          | Filter by service level (Luxury, Economy, etc.).                    |
| **`SecurityFeatureCodes`** | Array          | Filter by safety features (e.g., "24hr Security").                  |

### B. Specific Mode (With Info Toggles)

Use this to fetch specific details (Location, Amenities, etc.) for known `HotelCodes`. Use the `HotelInfoRef` flags to keep the response lightweight.

**Request Example:**

**JSON**

```
{
  "GetHotelListRQ": {
    "version": "4.1.0",
    "HotelRefs": {
      "HotelRef": [{ "HotelCode": "100011884", "CodeContext": "GLOBAL" }]
    },
    "HotelInfoRef": {
      "LocationInfo": true,
      "Amenities": true,
      "PropertyTypeInfo": true,
      "PropertyQualityInfo": true,
      "SecurityFeatures": true
    }
  }
}
```

### Handy Reference Arrays (Mapping Tables)

When the API returns numeric codes (e.g., `Code: 179`), use these tables to map them to user-friendly labels in your UI.

#### Common Amenity Codes (`Amenities`)

| **Code** | **Description**                 | **UI Category** |
| -------------- | ------------------------------------- | --------------------- |
| **179**  | Wireless internet connection (Public) | Connectivity          |
| **259**  | High speed internet access            | Connectivity          |
| **227**  | Complimentary breakfast               | Dining                |
| **42**   | Free parking                          | Facilities            |
| **54**   | Indoor pool                           | Recreation            |
| **48**   | Health club / Gym                     | Recreation            |
| **282**  | Airport shuttle service               | Transport             |

#### Security Feature Codes (`SecurityFeatures`)

| **Code** | **Description**    |
| -------------- | ------------------------ |
| **9**    | Complies with Fire Laws  |
| **39**   | Restricted public access |

#### Regional Chain Code Mapping

| **Country**         | **Key Chain Codes**                 | **Major Brands Represented**                             |
| ------------------------- | ----------------------------------------- | -------------------------------------------------------------- |
| **Côte d’Ivoire** | `AA`,`SI`,`MA`,`RA`               | Accor (Sofitel/Pullman), Sheraton, Marriott, Radisson.         |
| **Egypt**           | `HI`,`HL`,`SI`,`MS`,`MC`,`FS` | Hilton, Sheraton, Mövenpick (MS), Marriott, Four Seasons.     |
| **Emirates (UAE)**  | `JU`,`EK`,`HL`,`MA`,`RA`,`RZ` | Jumeirah (JU), Rotana (RT/EK), Hilton, Marriott, Ritz-Carlton. |
| **Qatar**           | `MC`,`RA`,`FS`,`HL`,`JU`,`W`  | Marriott, Radisson, Four Seasons, Hilton, Jumeirah, W Hotels.  |

#### Property Quality Codes (LOS)

| **Code** | **Meaning**      |
| -------------- | ---------------------- |
| **4**    | Luxury / Deluxe        |
| **5**    | First Class / Superior |
| **6**    | Moderate / Economy     |

## Get Hotel Image API

**Purpose:** Fetches visual content URLs for up to 300 properties in a single request.

### API Details

* **Endpoint:** POST /v1.0.0/shop/hotels/image
* **Capacity:** Max 300 `HotelCodes` per request.
* **Legal Constraint:** **No Caching.** Images must be fetched live to ensure they reflect the most recent updates from the property owners.

### Key Request Parameters

| **Parameter** | **Type** | **Description**                                         |
| ------------------- | -------------- | ------------------------------------------------------------- |
| `HotelRefs`       | Array          | List of `HotelCode`and `CodeContext`.                     |
| `ImageRef`        | Object         | Specify `Type`(ORIGINAL, THUMBNAIL, SMALL, MEDIUM, LARGE).  |
| `CategoryCodes`   | Array          | Filter by PIC categories (e.g., Guest Room, Lobby, Exterior). |
| `LanguageCode`    | String         | ISO language code for captions (e.g., "FR" for French).       |

### Request Structure

You can batch up to  **300 HotelCodes** . For a search result page, we recommend requesting `MEDIUM` or `LARGE`.

**Example Request:**

**JSON**

```
{
  "GetHotelImageRQ": {
    "version": "1.0.0",
    "HotelRefs": {
      "HotelRef": [
        { "HotelCode": "100005094", "CodeContext": "GLOBAL" }
      ]
    },
    "ImageRef": {
      "Type": "LARGE",
      "CategoryCode": 1, 
      "LanguageCode": "EN"
    }
  }
}
```

**Example Response:
JSON**
`{
  "GetHotelImageRS": {
    "version": "1.0.0",
    "ApplicationResults": {
      "status": "COMPLETE",
      "Success": [
        {
          "timeStamp": "2024-05-20T10:15:30.000-05:00",
          "type": "APPLICATION"
        }
      ]
    },
    "HotelImageInfos": {
      "HotelImageInfo": [
        {
          "HotelInfo": {
            "HotelCode": "100005094",
            "CodeContext": "GLOBAL",
            "ChainCode": "HY",
            "Logo": "https://images.sabre.com/logos/chains/HY_logo.png"
          },
          "ImageItem": {
            "Id": "img_992831",
            "Ordinal": 1,
            "Format": "JPG",
            "LastModifedDate": "2023-12-01T08:00:00",
            "Image": {
              "Url": "https://images.sabre.com/hotels/100005094/ext_view_large.jpg",
              "Type": "LARGE",
              "Height": 800,
              "Width": 1200
            },
            "Category": {
              "CategoryCode": 1,
              "Description": {
                "Text": [
                  { "content": "Hotel Exterior", "Language": "EN" },
                  { "content": "Extérieur de l'hôtel", "Language": "FR" }
                ]
              }
            },
            "AdditionalInfo": {
              "Info": [
                {
                  "Type": "CAPTION",
                  "Description": {
                    "Text": [{ "content": "Main entrance and facade at sunset", "Language": "EN" }]
                  }
                }
              ]
            }
          }
        }
      ]
    }
  }
}`


## 💰 2. Get Hotel Availability API

**Purpose:** The primary search engine. It finds available properties for a **specific date range** and returns the **Lead Rate** (cheapest price) for each.

### API Details

* **Endpoint:** `POST /v5/get/hotelavail`
* **Logic:** Orchestrates Geo-Search + Live Pricing.

### Mapping: Linking List to Availability

To transition from a "List" to "Available Prices," you pass the `HotelCode` from Step 1 into the `HotelRef` of this request.

| **Request Parameter** | **Description**             | **Example Value**                            |
| --------------------------- | --------------------------------- | -------------------------------------------------- |
| `StayDateRange`           | The check-in and check-out dates. | `2026-05-10`to `2026-05-15`                    |
| `RoomRequests`            | Guest count and age details.      | `Adults: 2, Children: 0`                         |
| `GeoSearch`               | Search radius around a location.  | `AirportCode: "LHR", Radius: 10`                 |
| **`RateKey`**       | **(In Response)**           | Use this unique key to get full details in Step 3. |

---

## 🔍 3. Get Hotel Details API

**Purpose:** Retrieves **every single available room and rate** for a specific property. While "Availability" shows you the hotel is open, "Details" shows you every Room Type (King, Twin, Suite) and every Rate Plan (Refundable, Member Rate, Breakfast Included).

### API Details

* **Endpoint:** `POST /v5/get/hoteldetails`
* **Key Feature:** Returns detailed policy text (Cancellation/Guarantee) for each individual rate.

### Detailed Rate Mapping

When a user selects a hotel, you must extract these specific items from the `Get Hotel Details` response for your "Review" page:

| **UI Component**   | **Data Source in Response**                 |
| ------------------------ | ------------------------------------------------- |
| **Room Name**      | `RoomSet[].RoomDescription.Name`                |
| **Full Breakdown** | `RateInfo.NightlyRates[]`(Price for each night) |
| **Cancellation**   | `RateInfo.CancellationPolicy.Description`       |
| **Total Price**    | `RateInfo.AmountAfterTax`                       |
| **Booking Key**    | `RateKey`(Critical for the final Booking step)  |

---

## 💡 Summary of the "Chain"

1. **Get Hotel List:** "Give me all Hilton hotels in Paris." → Returns  **IDs** .
2. **Get Hotel Avail:** "Which of these Hiltons are free May 1st-5th and how much is the cheapest?" → Returns  **Lowest Price** .
3. **Get Hotel Details:** "For Hilton Paris Opera, show me all King and Queen rooms with their specific cancellation rules." → Returns  **All Options** .
